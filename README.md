# WeatherApp

An web based weather app for the user to retrieve weather information

##Frameworks
- DarkSky API: https://www.npmjs.com/package/dark-sky
- jQuery
- BootStrap CSS

## Quick Start

####For dev user

Prerequist: install nodejs (v6.11.0), mongo db

First, go to the repo folder in terminal and run:
1. `npm install`

Second, start an server instance
2. `npm start`



####For MAC user (Deployment env)

First install nodeJS into your PC:
1. `$ brew update`
2. `$ brew install node`

 Verify installation:
3. `node -v`

You should see something like `v7.10.0`

Second install mongodb:
4. `brew install mongodb`

Start mongodb:

6. `brew services start mongodb`

Third install node version manager (nvm)
7. `brew install nvm`

Fourth, go to the repo folder in terminal and run:
8. `npm install`

Fifth, install PM2
9. `npm install pm2@latest -g`

Finally start an collector instance:
10. `pm2 start npm -- start`

Optional:

Stop the instance
11. `pm2 list all`

Find the one you started and stop it for example:

12. `pm2 stop 0`

Or you want to delete it totally(kill the instance)

13. `pm2 delete 0`


## Contributors

Originally authored by  [@RayLLiu](https://github.com/RayLLiu)[@zhang96](https://github.com/zhang96)
 and maintained by [@RayLLiu](https://github.com/RayLLiu)[@zhang96](https://github.com/zhang96)

Currently maintained by [@RayLLiu](https://github.com/RayLLiu)[@zhang96](https://github.com/zhang96)
