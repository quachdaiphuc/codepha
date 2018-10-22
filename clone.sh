#!/bin/bash
# 1, 2, 3 , 4 ,5 is paramenters position when you run command
# @1 public key
# @2 private key
# @3 project name
# @4 ssh url

echo $1 > ~/.ssh/"id_rsa_$3.pub"
echo -e $2 > ~/.ssh/"id_rsa_$3"
chmod 600 ~/.ssh/"id_rsa_$3"
cat ~/.ssh/"id_rsa_$3.pub" >> ~/.ssh/authorized_keys
echo -e "Host github.com\n\tStrictHostKeyChecking no\n\tIdentityFile ~/.ssh/id_rsa_$3\n\tAddKeysToAgent yes\n" > ~/.ssh/config
ssh-keyscan github.com > ~/.ssh/known_hosts
chmod -R 644 ~/.ssh/known_hosts

#mkdir -p /var/www/workdir

cd /var/www && git clone $4 > ~/.ssh/history.log

#if [[ $5 =~ ^-?[0-9]+$ ]]; then
#   cd /var/www/workdir/$6/$3 && git fetch origin refs/pull/$5/head:framgia-ci && git checkout framgia-ci
#else
#   cd /var/www/workdir/$6/$3 && git checkout $5
#fi
#sed -i.bak "/id_rsa_$3.pub/d" ~/.ssh/authorized_keys > ~/.ssh/history.log
#rm ~/.ssh/"id_rsa_$3.pub" > ~/.ssh/history.log
#rm ~/.ssh/"id_rsa_$3" > ~/.ssh/history.log
exit
