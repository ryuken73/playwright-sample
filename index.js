const getImage = async (page, name) => {
  const detailPageHeader = await page.getByRole('heading', {name}).getByRole('link');
  const table = await page.getByRole('table').first();
  const imgLocator = await table.getByRole('img').nth(1);
  const person = await detailPageHeader.innerText()
  const imgPath =  await imgLocator.evaluate(ele => ele.src);
  return { name, imgPath };
};

const KOR_ACTOR_URL = 'https://namu.wiki/w/%EB%B0%B0%EC%9A%B0/%ED%95%9C%EA%B5%AD';

test('open namu wiki', async ({page}) => {
  await page.goto(KOR_ACTOR_URL);

  // get 강찬희 - (SF9) like element
  // const persons = await page.getByRole('listitem').filter({hasText: /[가-힣]{2,4} - .*$/}).all();

  // get one document
  // await page.getByRole('listitem').filter({hasText: /강경준/ }).getByRole('link').click();
  // const result = await getImage(page, '강경준');
  // console.log(result)
  // await page.goBack();
  //

  // print img.src by evaluage
  // await page.getByRole('table').getByRole('img').nth(1).evaluate(element => console.log(element.src));

  const persons = await page.getByRole('listitem').filter({hasText: /^김/}).getByRole('link').all();
  for(let person of await persons){
    const name = await person.textContent();
    console.log('processing...', name);
    await person.click();
    console.log('click')
    const result = await getImage(page, name);
    console.log(result);
    await page.goBack();
  }

  // await page.getByRole('listitem').filter({hasNot: page.getByText('최근변경')});
        // .filter({has: page.getByRole('link', {name: '감우성'})});
  // const texts = await page.getByRole('listitem').allInnerTexts();
  // console.log(texts)
        // .filter({has: page.getByRole('link', {name: '감우성'})});
})