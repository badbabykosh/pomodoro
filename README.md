# pomodoro
a pomodoro clock

includes:
D3
bootstrap
jQuery

##Deployment

$ aws s3 sync . s3://pomodoro/ --exclude ".git/" --exclude ".idea/" --exclude ".DS_Store"