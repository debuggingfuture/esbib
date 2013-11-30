#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ref:
#    http://stackoverflow.com/questions/9235853/convert-bibtex-file-to-database-entries-using-python

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
            print str(e)

fn = '../input/statistics/mylibrary.bib'
es_url='http://137.189.97.90:5902/user1/bib/'
requests.delete(es_url)
bib2es(fn, es_url)

#for fn in sh.ls('-1', 'bib-storage').split():
#    try:
#        bib2es(path.join('bib-storage', fn), es_url)
#    except Exception as e:
#        print str(e)

#loop through the individual references
#for bib_id in bibdata.entries:
#
#    b = bibdata.entries[bib_id].fields
#    try:
#        print json.dumps(bibdata.entries[bib_id])
#        # change these lines to create a SQL insert
##        print b["title"]
##        print b["journal"]
##        print b["year"]
##        #deal with multiple authors
#        #for author in bibdata.entries[bib_id].persons["author"]:
#        #    print author.first(), author.last()
#    # field may not exist for a reference
#    except(KeyError):
#        continue
