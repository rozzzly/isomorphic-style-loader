#!/usr/bin/env bash


npm build
rm -fr ./dist
mkdir ./dist
cp ./bin/* ./dist
cp ./package.json ./dist
cd ./dist
npm publish