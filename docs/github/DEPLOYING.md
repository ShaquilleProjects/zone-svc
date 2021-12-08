## Deploying 


### First Time Deployment 

#### 1. Create a New App in Heroku

![CREATEAPP](images/CREATEAPP.png)


![NEWAPP](images/NEWAPP.png)

#### 2. SetUp Heroku CLI


Download [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) 

LogIn to Heroku with your terminal

        heroku login

Add Heroku remote branch to the current git repository

        heroku git:remote -a *heroku app name*

#### 3. Deploy App to Heroku

In your  terminal:

        git add .
        git commit -am "make it better"
        git push heroku master

#### 4. Buy a domain with GoDaddy

![GODADDY](images/GODADDY.png)

#### 5. Use Cloudflare to manage your DNS settings instead of GoDaddy


Navigate to Cloudflare, add site (choose free option), copy the nameservers

![CLOUDFLARE_ADD](images/CLOUDFLARE_ADD.png)

![CLOUDFLARE_NAMESERVER](images/CLOUDFLARE_NAMESERVER.png)

Navigate to GoDaddy, and replace nameservers with the ones that were given

![GODADDY_NAMESERVER](images/GODADDY_NAMESERVER.png)


place namservers from cloudflare here

![GODADDY_NS](images/GODADDY_NS.png)


#### 6. Update your DNS setting to allow domain to point to Heroku server

We want our domain name to point to our heroku app

Navigate to Heroku, add your domain, and copy the DNS target. This should look as follows:

![HEROKUSETTINGS](images/HEROKUSETTINGS.png)

Navigate to Cloudflare, on your websites DNS tab, edit the CNAME target to point to Heroku DNS target


![CLOUDFLAREDNS](images/CLOUDFLAREDNS.png)

![CLOUDFLARE_CNAME](images/CLOUDFLARE_CNAME.png)


#### 6. Add SSL Certificate

Navigate to the SSL tab for your domain on cloudflare and add a flexible ssl

![CLOUDFLARE_SSL](images/CLOUDFLARE_SSL.png)


#### 6. Forward all similar domains to your ssl connection

Navigate to the Rules tab for your domain on cloudflare and add these list of rules based on below

![FORWARDING_RULES](images/FORWARDING_RULES.png)


Add three rules, keep the settings in blue the same for all three. Change the settings in red to reflect the following:

        http://www.your_domain.com/*
        http://your_domain.com/*        
        https://your_domain.com/*

![FORWARDING_SETTINGS](images/FORWARDING_SETTINGS.png)


### Subsequent Deployments

In your  terminal:

        git add .
        git commit -am "make it better"
        git push heroku master