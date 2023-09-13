!define CLASSPATH "sample.jar"
!define CLASS "Sample"
!define JRE_VERSION "17"
!define JRE_URL "https://download.oracle.com/java/17/archive/jdk-17.0.8_windows-x64_bin.exe"
!define JAVAEXE "javaw.exe"


 
!include "FileFunc.nsh"
!insertmacro GetFileVersion
!insertmacro GetParameters
!include "WordFunc.nsh"
!insertmacro VersionCompare


!macro customInit
  ClearErrors
  ReadRegStr $1 HKLM "SOFTWARE\JavaSoft\Java Development Kit" "CurrentVersion"
  ReadRegStr $2 HKLM "SOFTWARE\JavaSoft\Java Development Kit\$1" "JavaHome"
 
  IfErrors 0 NoAbort
      Call GetJRE
  NoAbort:
      Call GetJRE 
     
!macroend

!macro customWelcomePage
  # Welcome Page is not added by default for installer.
  !insertMacro MUI_PAGE_WELCOME
!macroend

!ifndef BUILD_UNINSTALLER
  Function GetJRE
    Push $R0
    Push $R1
    Push $2
 
    ClearErrors
    ReadEnvStr $R0 "JAVA_HOME"
    StrCpy $R0 "$R0\bin\${JAVAEXE}"
    IfErrors CheckRegistry     
    IfFileExists $R0 0 CheckRegistry
    Call CheckJREVersion
    IfErrors CheckRegistry JreFound
 
    CheckRegistry:
      ClearErrors
      ReadRegStr $R1 HKLM "SOFTWARE\JavaSoft\Java Runtime Environment" "CurrentVersion"
      ReadRegStr $R0 HKLM "SOFTWARE\JavaSoft\Java Runtime Environment\$R1" "JavaHome"
      StrCpy $R0 "$R0\bin\${JAVAEXE}"
      IfErrors DownloadJRE
      IfFileExists $R0 0 DownloadJRE
      Call CheckJREVersion
      IfErrors DownloadJRE JreFound
  
    DownloadJRE:
      MessageBox MB_ICONINFORMATION "${PRODUCT_NAME} usa Java Runtime Environment ${JRE_VERSION}, ahora se descargará e instalará."
      ExecWait '"$EXEDIR\win-unpacked\java-17.exe"' $2
      DetailPrint "some program returned $0"
      Delete $2
      ReadRegStr $R1 HKLM "SOFTWARE\JavaSoft\Java Runtime Environment" "CurrentVersion"
      ReadRegStr $R0 HKLM "SOFTWARE\JavaSoft\Java Runtime Environment\$R1" "JavaHome"
      StrCpy $R0 "$R0\bin\${JAVAEXE}"
      IfFileExists $R0 0 GoodLuck
      Call CheckJREVersion
      IfErrors GoodLuck JreFound
 
    GoodLuck:
      StrCpy $R0 "${JAVAEXE}"
    JreFound:
      Pop $2
      Pop $R1
      Exch $R0
  FunctionEnd
!endif


Function CheckJREVersion
    Push $R1
 
    ; Get the file version of javaw.exe
    ${GetFileVersion} $R0 $R1
    ${VersionCompare} ${JRE_VERSION} $R1 $R1
 
    ; Check whether $R1 != "1"
    ClearErrors
    StrCmp $R1 "1" 0 CheckDone
    SetErrors
 
  CheckDone:
    Pop $R1
FunctionEnd

