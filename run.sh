#!/bin/bash

ROOT_DIR=$( cd "$( dirname "$0" )" && pwd )

SERVER_DIR=$ROOT_DIR

echo start the server
cd $SERVER_DIR
# run it in background(&) and redirect the output to logs(>>)
slc run &> $ROOT_DIR/logs/server.log &
# save the pid of the server.
echo $! > $ROOT_DIR/logs/server.pid

echo the site started!
