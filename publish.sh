#!/usr/bin/env bash

rm -fr ./dist
npm build
mkdir ./dist
cp ./bin/* ./dist
cp ./package.json ./dist
cd ./dist
npm publish