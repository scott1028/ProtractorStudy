describe('test spec demo', function() {
    it('should pass', function() {
        browser.get('https://aaa.bbb.com');

        element(By.css("[name=username]")).sendKeys('aaa.ddd');
        element(By.css("[name=password]")).sendKeys('bbb.ddd');
        element(by.css('[ng-click="submit()"]')).click();

        // find by nodeNam & contains text
        element(by.cssContainingText('a', 'Administration')).click();
        element(by.cssContainingText('a', 'User')).click();


        // 第一種方式(callback 寫法)
        element(by.cssContainingText('button', 'Query')).click().then(function() {

            // wait ajax, detect by Query Button to be enabled.
            element(By.css('td:visible:first'));

            var userList = element.all(by.repeater('item in userList'));
            expect(userList.count()).toBeGreaterThan(1);
        });


        // 另一種方式(感覺上 element 似乎會等待找到為止！)
        element(By.css('[ng-model="query.user_id__regex"]')).sendKeys('Sam');
        element(by.cssContainingText('button', 'Query')).click();

        // wait ajax, detect by Query Button to be enabled.
        element(by.cssContainingText('button:disabled', 'Query'));
        element(by.cssContainingText('button:enabled', 'Query'));

        var userList = element.all(by.repeater('item in userList'));
        expect(userList.count()).toEqual(2);
    });
});
