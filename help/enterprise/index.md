---
layout: help
title: Enterprise

---

# Prerequisites


- A Linux server (modern versions of Ubuntu, Debian, Centos, Red Hat & Fedora)

	> For Amazon EC2, we recommend using the [Ubuntu Server 14.04 LTS AMI](https://aws.amazon.com/marketplace/pp/B00JV9JBDS).
	
- A Classeur Enterprise license file (email <contact@classeur.io> for a free trial)

	> Pricing starts at $1,800 per year (10 users license).


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
2. Run this install script:

	```
	$ curl -sSL https://get.classeur.io | sudo sh
	```

	> To install Classeur behind a proxy, use the following command:

	```
	$ curl -sSL -x http://<proxy>:<port> -o /tmp/install.sh https://get.classeur.io && sudo sh /tmp/install.sh http-proxy=http://<proxy>:<port>
	```

3. Access your server via HTTPS on port 8800 & bypass the SSL security warning.

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

9. Visit the hostname you provided to access Classeur

