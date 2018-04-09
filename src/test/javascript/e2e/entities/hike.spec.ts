import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Hike e2e test', () => {

    let navBarPage: NavBarPage;
    let hikeDialogPage: HikeDialogPage;
    let hikeComponentsPage: HikeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Hikes', () => {
        navBarPage.goToEntity('hike');
        hikeComponentsPage = new HikeComponentsPage();
        expect(hikeComponentsPage.getTitle())
            .toMatch(/Hikes/);

    });

    it('should load create Hike dialog', () => {
        hikeComponentsPage.clickOnCreateButton();
        hikeDialogPage = new HikeDialogPage();
        expect(hikeDialogPage.getModalTitle())
            .toMatch(/Create or edit a Hike/);
        hikeDialogPage.close();
    });

    it('should create and save Hikes', () => {
        hikeComponentsPage.clickOnCreateButton();
        hikeDialogPage.setHikenameInput('hikename');
        expect(hikeDialogPage.getHikenameInput()).toMatch('hikename');
        hikeDialogPage.setMeetingplaceInput('meetingplace');
        expect(hikeDialogPage.getMeetingplaceInput()).toMatch('meetingplace');
        hikeDialogPage.setPositivedropInput('5');
        expect(hikeDialogPage.getPositivedropInput()).toMatch('5');
        hikeDialogPage.setDurationInput('5');
        expect(hikeDialogPage.getDurationInput()).toMatch('5');
        hikeDialogPage.setDateInput(12310020012301);
        expect(hikeDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        hikeDialogPage.save();
        expect(hikeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class HikeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-hike div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class HikeDialogPage {
    modalTitle = element(by.css('h4#myHikeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    hikenameInput = element(by.css('input#field_hikename'));
    meetingplaceInput = element(by.css('input#field_meetingplace'));
    positivedropInput = element(by.css('input#field_positivedrop'));
    durationInput = element(by.css('input#field_duration'));
    dateInput = element(by.css('input#field_date'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setHikenameInput = function(hikename) {
        this.hikenameInput.sendKeys(hikename);
    };

    getHikenameInput = function() {
        return this.hikenameInput.getAttribute('value');
    };

    setMeetingplaceInput = function(meetingplace) {
        this.meetingplaceInput.sendKeys(meetingplace);
    };

    getMeetingplaceInput = function() {
        return this.meetingplaceInput.getAttribute('value');
    };

    setPositivedropInput = function(positivedrop) {
        this.positivedropInput.sendKeys(positivedrop);
    };

    getPositivedropInput = function() {
        return this.positivedropInput.getAttribute('value');
    };

    setDurationInput = function(duration) {
        this.durationInput.sendKeys(duration);
    };

    getDurationInput = function() {
        return this.durationInput.getAttribute('value');
    };

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
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
