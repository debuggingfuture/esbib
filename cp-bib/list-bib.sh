#!/bin/bash

. ./conf.sh

rm -f list
touch list
for i in `cd $input_dir; find . -name "*.bib"`
do
    echo $i >> list
done
