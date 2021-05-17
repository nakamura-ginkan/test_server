const link = '.';
const pages = [
  { pageName: '/top/', pageID: 'top' },
  { pageName: '/top_nodata/', pageID: 'top_nodata' },
  { pageName: '/detail/', pageID: 'detail' },
  { pageName: '/detail_nodata/', pageID: 'detail_nodata' },
  { pageName: '/error/', pageID: 'error' },
];
const titleMeta = [
  'トップ',
  'トップ_データなし',
  '下層',
  '下層_データなし',
  'エラー'
];
const description = [
  '',
  '',
  '',
  '',
  ''
];
const keywords = [];
var fs = require('fs');

async function createFiles() {
  try {
    await Promise.all(
      pages.map(async (item, index) => {
        let page = item.pageName;
        let pageID = '';
        if (item.pageID) pageID = item.pageID;
        //create folder
        if (!fs.existsSync(`${link}/pug` + page) && page !== '/') {
          let index = page.lastIndexOf('/');
          tempPage = page.slice(0, index + 1);
          await fs.mkdirSync(`${link}/pug` + tempPage, { recursive: true });
        }
        //page
        const regex = /.html/gi;
        page = page.replace(regex, '.pug');
        if (page.slice(-1) === '/') {
          page += 'index.pug';
        }

        //get pageID
        let clonePage = page;
        clonePage = clonePage.split('');
        let slashIndex = clonePage
          .map((item, index) => (item === '/' ? index : undefined))
          .filter((x) => x);
        slashIndex.unshift(0);
        slashIndex.splice(0, slashIndex.length - 2);
        if (pageID === '') {
          if (page === '/index.pug') pageID = 'top';
          else if (page.endsWith('index.pug') && slashIndex.length > 1)
            pageID = page.slice(slashIndex[0] + 1, slashIndex[1]);
          else {
            slashLastIndex = page.lastIndexOf('/');
            pugLastIndex = page.lastIndexOf('.pug');
            pageID = page.slice(slashLastIndex + 1, pugLastIndex);
          }
        }

        //get path
        const numberIndex = page.split('/').length - 1;
        switch (numberIndex) {
          case 1:
            path = '.';
            break;
          case 2:
            path = '..';
            break;
          case 3:
            path = '../..';
            break;
          case 4:
            path = '../../..';
            break;
          case 5:
            path = '../../../..';
            break;
          case 6:
            path = '../../../../..';
        }
        // create files
        await fs.writeFileSync(
          `${link}/pug` + page,
          `extends ${path}/_layouts/default

block vars
  -title        = '${titleMeta[index] ? titleMeta[index] : ''}'
  -description  = '${description[index] ? description[index] : ''}'
  -keywords     = '${keywords[index] ? keywords[index] : ''}'
  -pageID       = '${pageID}'
  -path         = '${path}'
  -imgPC        = path+'/img/'+pageID+"/"
  -imgSP        = path+'/img/'+pageID+"/sp/"

block container`
        );

        await fs.writeFileSync(
          `${link}/sass/${pageID}.sass`,
          `@charset "utf-8"

/* BASE
 * -----------------------------------------------*/

@import "base/variables"
@import "base/mixins"
@import "base/base"


/* PARTS
 * -----------------------------------------------*/

@import "parts/header"
@import "parts/footer"


/* MODULES
 * -----------------------------------------------*/

// @import "parts/modules/title"
// @import "parts/modules/breadcrumb"
// @import "parts/modules/slick"


/* PAGE
 * -----------------------------------------------*/
@import "pages/${pageID}"`
        );
        await fs.writeFileSync(
          `${link}/sass/pages/_${pageID}.sass`,
          `@charset "utf-8"


/* ${pageID.toUpperCase()}
 * -----------------------------------------------*/`
        );
      })
    );
    console.log('Create file successfully!');
    console.log(
      { page: pages.length },
      { meta: titleMeta.length },
      { description: description.length },
      { keywords: keywords.length }
    );
  } catch (e) {
    console.log(e);
  }
}

createFiles();
