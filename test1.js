import {ClientFunction, Selector} from 'testcafe';
fixture `ZK-Web-Test`.page
`https://www.zkoss.org/zkdemo/shadow_elements/step_bar`;
test('ZK demo: side bar example test', async t => {
	console.log('check "need a car" button action');
	await t.click(Selector('.outline.stepbar-button'));
	await waitResponse(t);
	let isCarBtnExist = await ClientFunction(() => jq('.outline.stepbar-button').length == 1)();
	await t.expect(isCarBtnExist).notOk();

	console.log('check "next" button action');
	await t.click(Selector('.primary.stepbar-button'));
	await waitResponse(t);
	let isPreBtnExist = await ClientFunction(() => jq('.secondary.stepbar-button').length)();
	await t.expect(isPreBtnExist).ok();
	await t.expect(await ClientFunction(() => jq('.page-title').text())()).eql('Accommodation');

	console.log('check "back" button action');
	await t.click(Selector('.secondary.stepbar-button'));
	await waitResponse(t);
	isPreBtnExist = await ClientFunction(() => jq('.secondary.stepbar-button').length)();
	await t.expect(isPreBtnExist).notOk();
	await t.expect(await ClientFunction(() => jq('.page-title').text())()).eql('Destination');

	console.log('check "next" button flow');
	await t.click(Selector('.primary.stepbar-button'));
	await waitResponse(t);
	isPreBtnExist = await ClientFunction(() => jq('.secondary.stepbar-button').length)();
	await t.expect(isPreBtnExist).ok();
	await t.expect(await ClientFunction(() => jq('.page-title').text())()).eql('Accommodation');
	await t.click(Selector('.primary.stepbar-button'));
	await waitResponse(t);
	isPreBtnExist = await ClientFunction(() => jq('.secondary.stepbar-button').length)();
	await t.expect(isPreBtnExist).ok();
	await t.expect(await ClientFunction(() => jq('.page-title').text())()).eql('Rent Car');
	await t.click(Selector('.primary.stepbar-button'));
	await waitResponse(t);
	isPreBtnExist = await ClientFunction(() => jq('.secondary.stepbar-button').length)();
	await t.expect(isPreBtnExist).ok();
	await t.expect(await ClientFunction(() => jq('.page-title').text())()).eql('Personal Details');
	await t.click(Selector('.primary.stepbar-button'));
	await waitResponse(t);
	isPreBtnExist = await ClientFunction(() => jq('.secondary.stepbar-button').length)();
	await t.expect(isPreBtnExist).ok();
	await t.expect(await ClientFunction(() => jq('.page-title').text())()).eql('Payment');
	await t.click(Selector('.primary.stepbar-button'));
	await waitResponse(t);
	isPreBtnExist = await ClientFunction(() => jq('.secondary.stepbar-button').length)();
	await t.expect(isPreBtnExist).notOk();
	await t.expect(await ClientFunction(() => jq('.page-title').text())()).eql('Enjoy Holiday');
});

async function waitResponse(t) {
	await t.wait(300);
    while (await ClientFunction(() => !!zAu.processing() || !!jq.timers.length)()) {
        console.log('waiting..');
        await t.wait(300);
    }
}