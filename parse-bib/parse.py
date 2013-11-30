#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ref:
#    http://stackoverflow.com/questions/9235853/convert-bibtex-file-to-database-entries-using-python

"""
Usage:
    parse.py <input_dir> <es_url>

Options:
    -h --help     Show this screen.
"""

from pybtex.database.input import bibtex
import json
import copy
import requests
import sh
from os import path

def bib2es(bib_filename, es_url):
    #open a bibtex file
    parser = bibtex.Parser()
    bibdata = parser.parse_file(bib_filename)
    # fields of entry
    #    │add_person   collection   fields       get_crossref key          persons      type            │
    #    │vars                                                                                          │
    for e in bibdata.entries.values():
        # e can not be json serialized directly
        try:
            j = copy.copy(e.fields)
            j['bibfn'] = bib_filename
            j['bibkey'] = e.key
            j['type'] = e.type
            j['vars'] = e.vars
            j['author'] = [[p.first(), p.last()] for p in e.persons['author']]
            s = json.dumps(j)
            requests.post(es_url, data=s)
        except Exception as e:
            print "Exception:", str(e)

if __name__ == '__main__':
    from docopt import docopt
    arguments = docopt(__doc__, version='author.py 0.1')
    #print arguments
    #sys.exit(-1)
    input_dir = arguments['<input_dir>']
    es_url = arguments['<es_url>']

    #print input_dir
    #print es_url

    requests.delete(es_url)
    import os
    #for root, dirs, files in os.walk(".", topdown=False):
    for root, dirs, files in os.walk(input_dir):
        for name in files:
            fn = os.path.join(root, name)
            if fn.endswith('.bib'):
                print "parsing:", fn
                bib2es(fn, es_url)
        #for name in dirs:
        #    print (os.path.join(root, name))


    #fn = '../input/statistics/mylibrary.bib'
    #es_url='http://137.189.97.90:5902/user1/bib/'
    #bib2es(fn, es_url)

