rm './dist' -r
mkdir './dist'
robocopy './build' './dist' /s
robocopy './public' './dist' /s