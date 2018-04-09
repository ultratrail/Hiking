import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Hiker e2e test', () => {

    let navBarPage: NavBarPage;
    let hikerDialogPage: HikerDialogPage;
    let hikerComponentsPage: HikerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Hikers', () => {
        navBarPage.goToEntity('hiker');
        hikerComponentsPage = new HikerComponentsPage();
        expect(hikerComponentsPage.getTitle())
            .toMatch(/Hikers/);

    });

    it('should load create Hiker dialog', () => {
        hikerComponentsPage.clickOnCreateButton();
        hikerDialogPage = new HikerDialogPage();
        expect(hikerDialogPage.getModalTitle())
            .toMatch(/Create or edit a Hiker/);
        hikerDialogPage.close();
    });

    it('should create and save Hikers', () => {
        hikerComponentsPage.clickOnCreateButton();
        hikerDialogPage.setFirstnameInput('firstname');
        expect(hikerDialogPage.getFirstnameInput()).toMatch('firstname');
        hikerDialogPage.setNameInput('name');
        expect(hikerDialogPage.getNameInput()).toMatch('name');
        hikerDialogPage.sexSelectLastOption();
        hikerDialogPage.setBirthdateInput('2000-12-31');
        expect(hikerDialogPage.getBirthdateInput()).toMatch('2000-12-31');
        hikerDialogPage.setPhonenumberInput('phonenumber');
        expect(hikerDialogPage.getPhonenumberInput()).toMatch('phonenumber');
        hikerDialogPage.setAnaerobicmaximumspeedInput('5');
        expect(hikerDialogPage.getAnaerobicmaximumspeedInput()).toMatch('5');
        hikerDialogPage.setWeightInput('5');
        expect(hikerDialogPage.getWeightInput()).toMatch('5');
        hikerDialogPage.userSelectLastOption();
        // hikerDialogPage.itinerarySelectLastOption();
        hikerDialogPage.save();
        expect(hikerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class HikerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-hiker div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class HikerDialogPage {
    modalTitle = element(by.css('h4#myHikerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstnameInput = element(by.css('input#field_firstname'));
    nameInput = element(by.css('input#field_name'));
    sexSelect = element(by.css('select#field_sex'));
    birthdateInput = element(by.css('input#field_birthdate'));
    phonenumberInput = element(by.css('input#field_phonenumber'));
    anaerobicmaximumspeedInput = element(by.css('input#field_anaerobicmaximumspeed'));
    weightInput = element(by.css('input#field_weight'));
    userSelect = element(by.css('select#field_user'));
    itinerarySelect = element(by.css('select#field_itinerary'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFirstnameInput = function(firstname) {
        this.firstnameInput.sendKeys(firstname);
    };

    getFirstnameInput = function() {
        return this.firstnameInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setSexSelect = function(sex) {
        this.sexSelect.sendKeys(sex);
    };

    getSexSelect = function() {
        return this.sexSelect.element(by.css('option:checked')).getText();
    };

    sexSelectLastOption = function() {
        this.sexSelect.all(by.tagName('option')).last().click();
    };
    setBirthdateInput = function(birthdate) {
        this.birthdateInput.sendKeys(birthdate);
    };

    getBirthdateInput = function() {
        return this.birthdateInput.getAttribute('value');
    };

    setPhonenumberInput = function(phonenumber) {
        this.phonenumberInput.sendKeys(phonenumber);
    };

    getPhonenumberInput = function() {
        return this.phonenumberInput.getAttribute('value');
    };

    setAnaerobicmaximumspeedInput = function(anaerobicmaximumspeed) {
        this.anaerobicmaximumspeedInput.sendKeys(anaerobicmaximumspeed);
    };

    getAnaerobicmaximumspeedInput = function() {
        return this.anaerobicmaximumspeedInput.getAttribute('value');
    };

    setWeightInput = function(weight) {
        this.weightInput.sendKeys(weight);
    };

    getWeightInput = function() {
        return this.weightInput.getAttribute('value');
    };

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    itinerarySelectLastOption = function() {
        this.itinerarySelect.all(by.tagName('option')).last().click();
    };

    itinerarySelectOption = function(option) {
        this.itinerarySelect.sendKeys(option);
    };

    getItinerarySelect = function() {
        return this.itinerarySelect;
    };

    getItinerarySelectedOption = function() {
        return this.itinerarySelect.element(by.css('option:checked')).getText();
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
