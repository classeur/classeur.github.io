---
layout: help
title: Installation

---

# Prerequisites


- A Linux server (modern versions of Ubuntu, Debian, Centos, Red Hat & Fedora) with at least 20GB disk space.

	> We recommend using Ubuntu Server 16.04 LTS.
	> If using internal database, disk space usage will grow as number of users, files...
	
- A Classeur Enterprise license file.

	> You can checkout a license at https://enterprise.classeur.io or email <contact@classeur.io> for a free trial.



# Installation


## Firewall and EC2 Security Group

Classeur Enterprise requires specific ports to be open on the server. From the EC2 management console, create an entry for each port in the table below:

Port | Service | Description
---- | ------- | ---
8800 | Custom TCP Rule | This port is to access the admin dashboard for your Enterprise installation.
443 | HTTPS | Web application over HTTPS access.
80 | HTTP | Web application access.
22 | SSH | SSH access.

> For security reason, all other ports not listed here should be blocked.

## Get started

1. SSH into your Linux server

2.	Run this install script:

	```
	$ curl -sSL https://get.classeur.io/docker | sudo bash
	```
	
	If `curl` is not installed on your server, use `wget`:

	```
	$ wget -qO- https://get.replicated.com/docker | sudo bash
	```
	
	At the end of the installation, you should see the following message:

	![enter image description here](https://i.imgur.com/OlRCH6d.png)

	> Note that you will need the server to be accessed via a host/domain name rather than an IP address.

3. Access your server via HTTPS on port 8800 and bypass the SSL security warning.

	![enter image description here](https://i.imgur.com/XLvt2j4.png)

4. Upload a custom TLS/SSL cert/key or proceed with the provided self-signed pair.

	![enter image description here](https://i.imgur.com/QsjMomW.png)

5. Upload the provided license file (.rli)

	![enter image description here](https://i.imgur.com/0QGLicj.png)

6. Check your email for your license activation code.

	![enter image description here](https://i.imgur.com/FBgMckL.png)

7. Secure your Classeur Management console with a password

	![enter image description here](https://i.imgur.com/Ld90tiE.png)

8. Configure your Classeur instance and click "Save"

	![enter image description here](https://i.imgur.com/D7XetVw.png)

9. Visit the following URL to manage users and roles using the system key specified in the settings page

	```
	https://HOSTNAME/#!/users?syskey=SYSTEM_KEY
	``` 

