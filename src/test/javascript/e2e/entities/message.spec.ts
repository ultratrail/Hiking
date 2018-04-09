import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Message e2e test', () => {

    let navBarPage: NavBarPage;
    let messageDialogPage: MessageDialogPage;
    let messageComponentsPage: MessageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Messages', () => {
        navBarPage.goToEntity('message');
        messageComponentsPage = new MessageComponentsPage();
        expect(messageComponentsPage.getTitle())
            .toMatch(/Messages/);

    });

    it('should load create Message dialog', () => {
        messageComponentsPage.clickOnCreateButton();
        messageDialogPage = new MessageDialogPage();
        expect(messageDialogPage.getModalTitle())
            .toMatch(/Create or edit a Message/);
        messageDialogPage.close();
    });

    it('should create and save Messages', () => {
        messageComponentsPage.clickOnCreateButton();
        messageDialogPage.setLongitudeInput('5');
        expect(messageDialogPage.getLongitudeInput()).toMatch('5');
        messageDialogPage.setLatitudeInput('5');
        expect(messageDialogPage.getLatitudeInput()).toMatch('5');
        messageDialogPage.setDatetimeInput(12310020012301);
        expect(messageDialogPage.getDatetimeInput()).toMatch('2001-12-31T02:30');
        messageDialogPage.getSosInput().isSelected().then((selected) => {
            if (selected) {
                messageDialogPage.getSosInput().click();
                expect(messageDialogPage.getSosInput().isSelected()).toBeFalsy();
            } else {
                messageDialogPage.getSosInput().click();
                expect(messageDialogPage.getSosInput().isSelected()).toBeTruthy();
            }
        });
        messageDialogPage.getEspONInput().isSelected().then((selected) => {
            if (selected) {
                messageDialogPage.getEspONInput().click();
                expect(messageDialogPage.getEspONInput().isSelected()).toBeFalsy();
            } else {
                messageDialogPage.getEspONInput().click();
                expect(messageDialogPage.getEspONInput().isSelected()).toBeTruthy();
            }
        });
        messageDialogPage.setHeartrateInput('5');
        expect(messageDialogPage.getHeartrateInput()).toMatch('5');
        messageDialogPage.senderSelectLastOption();
        messageDialogPage.hikeSelectLastOption();
        messageDialogPage.save();
        expect(messageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MessageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-message div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class MessageDialogPage {
    modalTitle = element(by.css('h4#myMessageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    longitudeInput = element(by.css('input#field_longitude'));
    latitudeInput = element(by.css('input#field_latitude'));
    datetimeInput = element(by.css('input#field_datetime'));
    sosInput = element(by.css('input#field_sos'));
    espONInput = element(by.css('input#field_espON'));
    heartrateInput = element(by.css('input#field_heartrate'));
    senderSelect = element(by.css('select#field_sender'));
    hikeSelect = element(by.css('select#field_hike'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setLongitudeInput = function(longitude) {
        this.longitudeInput.sendKeys(longitude);
    };

    getLongitudeInput = function() {
        return this.longitudeInput.getAttribute('value');
    };

    setLatitudeInput = function(latitude) {
        this.latitudeInput.sendKeys(latitude);
    };

    getLatitudeInput = function() {
        return this.latitudeInput.getAttribute('value');
    };

    setDatetimeInput = function(datetime) {
        this.datetimeInput.sendKeys(datetime);
    };

    getDatetimeInput = function() {
        return this.datetimeInput.getAttribute('value');
    };

    getSosInput = function() {
        return this.sosInput;
    };
    getEspONInput = function() {
        return this.espONInput;
    };
    setHeartrateInput = function(heartrate) {
        this.heartrateInput.sendKeys(heartrate);
    };

    getHeartrateInput = function() {
        return this.heartrateInput.getAttribute('value');
    };

    senderSelectLastOption = function() {
        this.senderSelect.all(by.tagName('option')).last().click();
    };

    senderSelectOption = function(option) {
        this.senderSelect.sendKeys(option);
    };

    getSenderSelect = function() {
        return this.senderSelect;
    };

    getSenderSelectedOption = function() {
        return this.senderSelect.element(by.css('option:checked')).getText();
    };

    hikeSelectLastOption = function() {
        this.hikeSelect.all(by.tagName('option')).last().click();
    };

    hikeSelectOption = function(option) {
        this.hikeSelect.sendKeys(option);
    };

    getHikeSelect = function() {
        return this.hikeSelect;
    };

    getHikeSelectedOption = function() {
        return this.hikeSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
