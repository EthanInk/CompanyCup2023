@echo off
setlocal

REM Set the name of the zip file
set "zipname=source.zip"

REM Delete the zip file if it already exists (optional)
if exist "%zipname%" del "%zipname%"

REM Compress all files in the current directory into a zip file
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -noprofile -command "& {Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('.\', '%zipname%');}"
