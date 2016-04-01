#!/bin/bash
#set -x
set -e

################################################################################################################
#
# Discliamer: This script is highly depends on haozi's personal pc environment, for the purpose
# to automate his daily work. It's not guaranteed that this will also work on others' pc environment.
#
# This script is running on OSX.
#
################################################################################################################


# current dir http://stackoverflow.com/a/246128/1494097
OP_SCRIPT_DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
OP_WORKING_DIRECTORY=$HOME/opentown/opentown-web
OP_HOST_BAK=$OP_WORKING_DIRECTORY/hosts.bak
OP_SERVER_PID=$OP_WORKING_DIRECTORY/server.pid
OP_WATCH_PID=$OP_WORKING_DIRECTORY/watch.pid

op_has() {
  type "$1" > /dev/null 2>&1
}
is_service_running(){
  ps ax | grep -v grep | grep $1 > /dev/null
}

# to check if text $1 exists in file $2
# http://stackoverflow.com/a/4749368/1494097
is_text_exist_in_file(){
   cat $2 | grep -v grep | grep $1 > /dev/null
}

#
# let local pc pretend to be opentown.cn/web to cheat the server CORS.
#
edit_hosts(){
  cp /etc/hosts $OP_HOST_BAK
  sudo sh -c "echo '127.0.0.1 opentown.cn' >> /etc/hosts"
}

restore_hosts(){
  if [ -e $OP_HOST_BAK ]; then
    sudo mv $OP_HOST_BAK /etc/hosts
  fi
}

# An nginx is configured as reverse proxy, which redirect "opentown.cn/web" -> "localhost:8181"
# So at here just to start the nginx, and start the node service at "localhost:8181" 
start_nginx(){
  if ! op_has nginx; then
    echo "Nignx not installed, install it via brew."
    brew install nginx
  fi
  if is_service_running "nginx"; then
   echo "nginx is already started..."
 else
   echo "try to start nginx..."
   sudo nginx -c $OP_SCRIPT_DIRECTORY/nginx.conf 
 fi 
}

stop_nginx(){
  if is_service_running "nginx"; then
   sudo nginx -s stop
   echo "nginx stopped..."
 else
   echo "nginx already stopped, no need to stop it again..."
 fi 
}

start_opentown_web(){
  cd $OP_WORKING_DIRECTORY
  echo "Use 'grunt connect' to start the node Express server"
  nohup grunt connect &
  echo $! > $OP_SERVER_PID 
  echo "Use 'grunt watch' to watch any code changes."
  nohup grunt watch &
  echo $! > $OP_WATCH_PID
  sleep 1.5s
  open "http://opentown.cn/web"
}

#
# The OP_PID is a file contain pid.
# 
stop_pid(){
  OP_PID=$1
  OP_MESSAGE=$2
  if [ -e $OP_PID ]; then
    kill $(cat $OP_PID)
    echo $OP_MESSAGE
    rm $OP_PID 
  fi
}

stop_opentown_web(){
  stop_pid $OP_SERVER_PID "Stop 'grunt connect', which is to start the node Express server"
  stop_pid $OP_WATCH_PID  "Stop 'grunt watch', which is to watch any code changes."
}

start(){
  if [ -e $OP_SERVER_PID -o -e $OP_WATCH_PID ]; then
    echo "The server is already started, please stop it first."
    exit;
  fi
  edit_hosts
  start_nginx
  start_opentown_web
  echo "opentown-web dev started."
}

stop(){
  restore_hosts
  stop_nginx
  stop_opentown_web
  echo "opentown-web dev stoped."
}

main(){
  case $1 in
    "help" | "-h" )
      echo "The script to manage local development environment for opentown-web."
      echo ""
      echo "The command is as follows:"
      echo ""
      echo "start   to start the dev environment."
      echo "stop    to stop the dev environment."
      ;;
    "start" )
      start
      ;;
    "stop" )
      stop
      ;;
  esac
}


main $@
