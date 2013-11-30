import unittest
import sys
sys.path.append('../')

import parse

class bib2JsonTest(unittest.TestCase):                 

    def test_json_return(self):

    #     bibdata = parser.parse_file(bib_filename)
    # for e in bibdata.entries.values():

        parse.bib2json();

        self.assertEqual(cal.mod(5, 3), (1, 2))          

if __name__ == '__main__':
    unittest.main()    