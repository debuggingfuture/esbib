#!/bin/bash

. ./conf.sh

for i in `cat list`
do
    src=$input_dir/$i
    dst=$output_dir/$i
    #echo $src $dst
    mkdir -p `dirname $dst`
    cp $src $dst
done
