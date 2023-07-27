@echo off
setlocal

REM Set the name of the zip file
set "zipname=source.zip"

REM Delete the zip file if it already exists (optional)
if exist "%zipname%" del "%zipname%"

REM Compress all files and folders in the current directory into a zip file
powershell -noprofile -command "Compress-Archive -Path '.\*' -DestinationPath '%zipname%'"