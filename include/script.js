/* This program is free software. It comes without any warranty, to
     * the extent permitted by applicable law. You can redistribute it
     * and/or modify it under the terms of the Do What The Fuck You Want
     * To Public License, Version 2, as published by Sam Hocevar. See
     * http://www.wtfpl.net/ for more details. */
window.onload = onLoad;
window.onhashchange = onHashChange;
var currentFileLink = "";
var currentFileDir = "";
var currentFileName = "";
var fileCount = 0;
var driveLetter = "E:";
var loggedIn = false;

function getCurrentDir()
{
    return location.hash.replace("#", "");
}

function onLoad()
{
    if (location.hash == "")
    {
        location.hash = "/";
    }
    else
    {
        updateDir();
    }
}

function empytyList()
{
    document.getElementById("fileList").innerHTML = "";
}

function fixDir()
{
    var currentDir = getCurrentDir()
    for (var i = 1; i < currentDir.length; i++)
    {
        if (currentDir.substring(i - 1, i) != "/")
        {
            break;
        }
        currentDir = currentDir.substring(1, currentDir.length);
    }
    location.hash = currentDir;
}

function updateDir()
{
    document.getElementById("searchBox").value = "";
    empytyList();
    var rq = new XMLHttpRequest();
    rq.open("POST", "scandir.php");
    rq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    rq.send("dir="+getCurrentDir() + "&drive=" + driveLetter);
    rq.onload = function () {
        console.log(rq.responseText);
        var fileList;
        try
        {
            fileList = JSON.parse(rq.responseText);
        }
        catch(e)
        {
            addFile(".", 0);
            document.getElementById("currentDir").innerHTML = getCurrentDir();
            alert(rq.responseText);
        }
        for (var i = 0; i < fileList.length; i++)
        {
            addFile(fileList[i], i);
        }
        fileCount = fileList.length;
        document.getElementById("currentDir").innerHTML = getCurrentDir();
        if (getCurrentDir().startsWith("//"))
        {
            fixDir();
        }
    }
}

function addFile(filename, id)
{
    function fileType(type)
    {
        return filename.endsWith("." + type)
    }
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.id = "file" + id;
    if (getCurrentDir().includes("/utsdata"))
    {
        if (fileType("html") || fileType("css") || fileType("js") || fileType("scss") || fileType("htm"))
        {
            console.log("html, css or js file: " + filename);
            a.innerHTML = filename;
            if (getCurrentDir().includes("/utsdata/")) {
                a.href = "http://tsuts.tskoli.is/" + getCurrentDir().replace("/utsdata/", "") + "/" + filename;
            }
            else {
                a.href = "http://tsuts.tskoli.is/" + getCurrentDir().replace("/utsdata", "") + filename;
            }
            if (loggedIn) {
                a.dataset.name = filename;
                a.dataset.dir = getCurrentDir();
                a.oncontextmenu = openLoggedInFileMenu;
            }
            a.target = "_blank";
            li.appendChild(a);
            document.getElementById("fileList").appendChild(li);
            return;
        }
        if (fileType("php"))
        {
            console.log("php file: " + filename);
            a.innerHTML = filename;
            a.onclick = openPhpFileMenu;
            a.dataset.name = filename;
            a.dataset.dir = getCurrentDir();
            if (getCurrentDir().includes("/utsdata/"))
            {
                a.dataset.link = "http://tsuts.tskoli.is/" + getCurrentDir().replace("/utsdata/", "") + "/" + filename;
            }
            else
            {
                a.dataset.link = "http://tsuts.tskoli.is/" + getCurrentDir().replace("/utsdata", "") + filename;
            }
            if (loggedIn){
                a.dataset.name = filename;
                a.dataset.dir = getCurrentDir();
                a.oncontextmenu = openLoggedInFileMenu;
            }
            li.appendChild(a);
            document.getElementById("fileList").appendChild(li);
            return;
        }
    }
    if (fileType("txt") || fileType("exe") || fileType("msi") || fileType("config") || fileType("sys")|| fileType("inf") || fileType("efi") || fileType("dll") || fileType("xml") || fileType("c") || fileType("py") || fileType("pdf") || fileType("cmd") || fileType("zip"))
    {
        a.innerHTML = filename;
        if (loggedIn)
        {
            a.dataset.name = filename;
            a.dataset.dir = getCurrentDir();
            a.onclick = openLoggedInFileMenu;
        }
        else
        {
            a.href = "http://tsuts.tskoli.is/2t/1404002030/filemgr/download.php?dir=" + getCurrentDir() + "&filename=" + filename;
        }
        li.appendChild(a);
        document.getElementById("fileList").appendChild(li);
        return;
    }
    if (fileType("png") || fileType("jpg") || fileType("gif") || fileType("ico"))
    {
        console.log("image file: " + filename)
        a.innerHTML = filename;
        a.href = "http://tsuts.tskoli.is/2t/1404002030/filemgr/img.php?dir=" + getCurrentDir() + "/" + filename + "&filename=" + filename;
        a.target = "_blank";
        if (loggedIn) {
            a.dataset.name = filename;
            a.dataset.dir = getCurrentDir();
            a.oncontextmenu = openLoggedInFileMenu;
        }
        li.appendChild(a);
        document.getElementById("fileList").appendChild(li);
        return;
    }
    if (getCurrentDir() == "/")
    {
        if (filename == "." || filename == "..") return;
        a.innerHTML = filename;
        a.href = "#/" + filename;
        li.appendChild(a);
        document.getElementById("fileList").appendChild(li);
        return;
    }
    if (filename == ".")
    {
        var dir = getCurrentDir().split("/");
        dir.pop();
        var newDir = dir.join("/");
        a.innerHTML = filename;
        a.href = "#/" + newDir;
        if (a.href.startsWith("#//"))
        {
            a.href = "#" + a.href.substring(2);
        }
        li.appendChild(a);
        document.getElementById("fileList").appendChild(li);
        return;
    }
    if (filename == "..") {
        if (getCurrentDir().split("/").length == 2) return;
        var dir = getCurrentDir().split("/");
        dir.pop();
        dir.pop();
        var newDir = dir.join("/");
        a.innerHTML = filename;
        a.href = "#/" + newDir;
        if (a.href.startsWith("#//"))
        {
            a.href = "#" + a.href.substring(2);
        }
        li.appendChild(a);
        document.getElementById("fileList").appendChild(li);
        return;
    }
    a.innerHTML = filename;
    a.href = location.hash + "/" + filename;
    li.appendChild(a);
    document.getElementById("fileList").appendChild(li);
}

function openPhpFileMenu(e)
{
    closeLoggedInFileMenu();
    document.getElementById("phpFileMenu").hidden = false;
    document.getElementById("menuFileName").innerHTML = e.srcElement.dataset.name;
    currentFileLink = e.srcElement.dataset.link;
    currentFileDir = e.srcElement.dataset.dir;
    currentFileName = e.srcElement.dataset.name;
}
function openLoggedInFileMenu(e)
{
    e.preventDefault();
    closePhpFileMenu();
    currentFileDir = e.srcElement.dataset.dir;
    currentFileName = e.srcElement.dataset.name;
    document.getElementById("loggedInFileMenuTitle").innerHTML = currentFileName;
    document.getElementById("loggedInFileMenu").hidden = false;
}
function closeLoggedInFileMenu()
{
    document.getElementById("loggedInFileMenu").hidden = true;
}
function closePhpFileMenu()
{
    document.getElementById("phpFileMenu").hidden = true;
}
function openPhpInBrowser()
{
    window.open(currentFileLink, "_blank");
}
function showCurrentPhpCode()
{
    window.open("http://tsuts.tskoli.is/2t/1404002030/filemgr/showContent.php?dir=" + currentFileDir + "/" + currentFileName, "_blank");
}
function downloadCurrentFile()
{
    window.open("http://tsuts.tskoli.is/2t/1404002030/filemgr/download.php?dir=" + currentFileDir + "&filename=" + currentFileName, "_blank");
}

function downlaodFile(fileName, dir)
{
    window.open("http://tsuts.tskoli.is/2t/1404002030/filemgr/download.php?dir=" + dir + "&filename=" + fileName, "_blank");
}

function onHashChange()
{
    closeTextEditor();
    closePhpFileMenu();
    closeLoggedInFileMenu();
    updateDir();
}

function showAllFiles()
{
    for (var i = 0; i < fileCount; i++)
    {
        if (document.getElementById("file" + i) != null)
        {
            if (document.getElementById("file" + i).style.display == "none")
            {
                document.getElementById("file" + i).style.display = "";
            }
        }
    }
}

function onDriveChange()
{
    var s = document.getElementById("drive");
    driveLetter = s.options[s.selectedIndex].value;
    if (getCurrentDir() == "/")
    {
        updateDir();
        return;
    }
    location.hash = "/";
}

function onSearchChange()
{
    var searchBox = document.getElementById("searchBox");
    if (searchBox.value == "")
    {
        if (document.getElementById("fileList").innerHTML != "")
        {
            showAllFiles();
        }
        return;
    }
    for (var i = 0; i < fileCount; i++)
    {
        if (document.getElementById("file" + i) != null)
        {
            if (document.getElementById("file" + i).innerHTML.toLowerCase().startsWith(searchBox.value.toLowerCase()))
            {
                document.getElementById("file" + i).style.display = "";
            }
            else
            {
                document.getElementById("file" + i).style.display = "none";
            }
        }
    }
}

function login()
{
    var password = prompt("Password", "");
    var rq = new XMLHttpRequest();
    rq.open("POST", "logIn.php", true);
    rq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    rq.send("passwd=" + password);
    rq.onload = function () {
        if (rq.responseText == "success")
        {
            loggedIn = true;
            document.getElementById("tools").style.display = "";
            document.getElementById("unlockButton").style.display = "none";
            updateDir();
        }
        else
        {
            alert(rq.responseText);
        }
    }
}

function createDirectory()
{
    var dirName = prompt("Directory name", "");
    var rq = new XMLHttpRequest();
    rq.open("POST", "mkdir.php", true);
    rq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    rq.send("dir=" + getCurrentDir() + "/" + dirName);
    rq.onload = function () {
        if (rq.responseText == "success") {
            updateDir();
        }
        else {
            alert(rq.responseText);
        }
    }
}
function createFile() {
    var fileName = prompt("File name", "");
    var rq = new XMLHttpRequest();
    rq.open("POST", "mkfile.php", true);
    rq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    rq.send("dir=" + getCurrentDir() + "/" + fileName);
    rq.onload = function () {
        if (rq.responseText == "success") {
            if (confirm("Opna í text editor")) {
                openFileInEditor(fileName);
            }
            updateDir();
        }
        else {
            alert(rq.responseText);
        }
    }
}

function openFileInEditor(filename)
{
    var rq = new XMLHttpRequest();
    rq.open("POST", "getContent.php", true);
    rq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    rq.send("dir=" + getCurrentDir() + "/" + filename);
    rq.onload = function () {
        document.getElementById("textEditor").value = rq.responseText;
        document.getElementById("textEditorDiv").style.display = "";
    }
}
function saveFile()
{
    var rq = new XMLHttpRequest();
    var text = document.getElementById("textEditor").value;
    rq.open("POST", "save.php", true);
    rq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    rq.send("text=" + text + "&dir=" + getCurrentDir());
    rq.onload = function () {
        if (rq.responseText == "success")
        {
            document.getElementById("textEditorDiv").style.display = "none";
            alert("File saved!");
        }
        else
        {
            alert(rq.responseText);
        }
    }
}
function closeTextEditor()
{
    document.getElementById("textEditorDiv").style.display = "none";
}

function deleteCurrentFile()
{
    if (!confirm("Are you sure you want to delete " + currentFileName)) { return; }
    var rq = new XMLHttpRequest();
    rq.open("POST", "delete.php", true);
    rq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    rq.send("dir=" + currentFileDir + "/" + currentFileName);
    rq.onload = function () {
        if (rq.responseText == "success")
        {
            alert("Deleted");
            updateDir();
        }
        else
        {
            alert(rq.responseText);
        }
    }
}

function onDrop(e)
{
    if (!loggedIn)
    {
        return;
    }
    e.preventDefault();
    var rq = new XMLHttpRequest();
    rq.open("POST", "upload.php", true);
    var files = new FormData();
    files.append("file", e.dataTransfer.items[0].getAsFile());
    files.append("dir", getCurrentDir());
    rq.send(files);
    rq.onload = function () {
        console.log(rq.responseText)
        updateDir();
    }
}
function logOut()
{
    var rq = new XMLHttpRequest();
    rq.open("POST", "logout.php", true);
    rq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    rq.send();
    rq.onload = function () {
        loggedIn = false;
        document.getElementById("tools").style.display = "none";
        document.getElementById("unlockButton").style.display = "";
        alert(rq.responseText);
        updateDir();
    }
}