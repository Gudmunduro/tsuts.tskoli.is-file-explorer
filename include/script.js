window.onload = onLoad;
window.onhashchange = onHashChange;
var currentPhpFileLink = "";
var currentPhpFileDir = "";
var currentPhpFileName = "";
var fileCount = 0;
var driveLetter = "E:";

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
        var fileList = JSON.parse(rq.responseText);
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
        if (fileType("html") || fileType("css") || fileType("js"))
        {
            console.log("html, css or js file: " + filename);
            a.innerHTML = filename;
            if (getCurrentDir().includes("/utsdata/")) {
                a.href = "http://tsuts.tskoli.is/" + getCurrentDir().replace("/utsdata/", "") + "/" + filename;
            }
            else {
                a.href = "http://tsuts.tskoli.is/" + getCurrentDir().replace("/utsdata", "") + filename;
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
            a.dataset.dir = getCurrentDir() + "/" + filename;
            if (getCurrentDir().includes("/utsdata/")) {
                a.dataset.link = "http://tsuts.tskoli.is/" + getCurrentDir().replace("/utsdata/", "") + "/" + filename;
            }
            else {
                a.dataset.link = "http://tsuts.tskoli.is/" + getCurrentDir().replace("/utsdata", "") + filename;
            }
            li.appendChild(a);
            document.getElementById("fileList").appendChild(li);
            return;
        }
    }
    if (fileType("txt") || fileType("exe") || fileType("msi") || fileType("config") || fileType("sys") || fileType("inf") || fileType("efi") || fileType("dll") || fileType("xml") || fileType("c") || fileType("py"))
    {
        a.innerHTML = filename;
        a.href = "http://tsuts.tskoli.is/2t/1404002030/filemgr/download.php?dir=" + getCurrentDir() + "/" + filename + "&filename=" + filename;
        li.appendChild(a);
        document.getElementById("fileList").appendChild(li);
        return;
    }
    if (fileType("png") || fileType("jpg") || fileType("gif"))
    {
        console.log("image file: " + filename)
        a.innerHTML = filename;
        a.href = "http://tsuts.tskoli.is/2t/1404002030/filemgr/img.php?dir=" + getCurrentDir() + "/" + filename + "&filename=" + filename;
        a.target = "_blank";
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
    document.getElementById("phpFileMenu").hidden = false;
    document.getElementById("menuFileName").innerHTML = e.srcElement.dataset.name;
    currentPhpFileLink = e.srcElement.dataset.link;
    currentPhpFileDir = e.srcElement.dataset.dir;
    currentPhpFileName = e.srcElement.dataset.name;
}
function closePhpFileMenu()
{
    document.getElementById("phpFileMenu").hidden = true;
}
function openPhpInBrowser()
{
    window.open(currentPhpFileLink, "_blank");
}
function showCurrentPhpCode()
{
    window.open("http://tsuts.tskoli.is/2t/1404002030/filemgr/showContent.php?dir=" + currentPhpFileDir, "_blank");
}
function downloadCurrentPhpFile()
{
    window.open("http://tsuts.tskoli.is/2t/1404002030/filemgr/download.php?dir=" + currentPhpFileDir + "&filename=" + currentPhpFileName, "_blank");
}

function downlaodFile(fileName, dir)
{
    window.open("http://tsuts.tskoli.is/2t/1404002030/filemgr/download.php?dir=" + dir + "&filename=" + fileName, "_blank");
}

function onHashChange()
{
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