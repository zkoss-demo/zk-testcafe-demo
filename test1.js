import {ClientFunction, Selector} from 'testcafe';
fixture `ZK-Web-Test`.page `https://www.zkoss.org/zkdemo/shadow_elements/step_bar`;
const addCarButton = Selector('button.stepbar-button').withText('Yes, I need a Car!');
const backButton = Selector('button.stepbar-button').withText('Back');
const nextButton = Selector('button.stepbar-button').withText('Next');
const pageTitle = Selector('.page-title');
const steps = Selector('.stepbar .step');
const hasPageTitle = title => pageTitle.withText(title).exists;

test('ZK demo: step bar example test', async t => {
    await t.expect(hasPageTitle('Destination')).ok()
        .expect(backButton.exists).notOk('Back button should not exist')
        .expect(addCarButton.exists).ok('Add car button should exist')
        .expect(steps.count).eql(5, 'There should be 5 steps initially')
        
        .click(addCarButton)
        .expect(addCarButton.exists).notOk("Add car button should disappear")
        .expect(steps.count).eql(6, 'There should be 6 steps')
        
        .click(nextButton)
        .expect(backButton.exists).ok('Back button should exist')
        .expect(hasPageTitle('Accommodation')).ok()
        .click(nextButton)
        .expect(hasPageTitle('Rent Car')).ok()
        .click(nextButton)
        .expect(hasPageTitle('Personal Details')).ok()
        .click(nextButton)
        .expect(hasPageTitle('Payment')).ok()
        .click(nextButton)
        .expect(hasPageTitle('Enjoy Holiday')).ok()
        .expect(nextButton.exists).notOk('Next button should be gone');
});
