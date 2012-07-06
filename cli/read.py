from readability.readability import Document
import urllib
import json
import sys

class MyOpener(urllib.FancyURLopener):
    version = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1196.0 Safari/537.1"


def getContent(url):
    urlopen = MyOpener().open
    html = urlopen(url).read()
    readable_article = Document(html).summary().encode('utf-8' , 'replace')
    print readable_article
                    



if __name__ == '__main__':
    content = getContent(sys.argv[1])
    
