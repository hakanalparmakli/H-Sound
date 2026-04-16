@echo off
echo H-Sound Pro v14.4 - Local Server Baslatiliyor...
echo.
echo Tarayicinizda su adresi acin: http://localhost:8000
echo.
echo Server'i durdurmak icin Ctrl+C basin
echo.

REM Python 3 varsa onu kullan
python -m http.server 8000 2>nul
if %errorlevel% neq 0 (
    REM Python 2 varsa onu kullan
    python -m SimpleHTTPServer 8000 2>nul
    if %errorlevel% neq 0 (
        REM Node.js varsa onu kullan
        npx http-server -p 8000 2>nul
        if %errorlevel% neq 0 (
            echo HATA: Python veya Node.js bulunamadi!
            echo Lutfen Python veya Node.js yukleyin.
            pause
        )
    )
)