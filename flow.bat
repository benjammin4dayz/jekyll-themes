@echo off

REM Create the build directory
mkdir ..\jekyll-flow

REM Copy all files from ./__dist to ./../build
xcopy /E /I __dist ..\jekyll-flow

echo Files copied successfully.
