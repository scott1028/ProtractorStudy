# Protractor Study

### Demo

![Alt text](https://raw.githubusercontent.com/scott1028/protractorStudy/master/protractorDemo01.gif "Demo")

### Installation

~~~
$ npm install -g protractor
  … update & launch
$ webdriver-manager update
$ webdriver-manager start       ← 注意 Java 版本，太低會 Run 不起來！
  … prepare testspec...
~~~

### 準備一份測試腳本

###### todo-spec.js

~~~
describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('https://angularjs.org');     // 你預定要測試的目標 WebUI 伺服器

    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();    // 似乎也能用 CSS Selector

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);
  });
});
~~~

###### conf.js

~~~
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',    // ← 本地端 seleniumAddress 控制台的 Service Address
  specs: ['todo-spec.js']
};
~~~

### Run Your Test

~~~
$ webdriver-manager start           // 務必要啟動，而且 JDK 版本太低會出錯！
$ protractor conf.js
~~~

### Run Your Test with "debugger;" keyword in your test-spec file

~~~
$ protractor debug conf-another.js
  
  ... (要按一下 "C")

 10     element(by.css('[ng-click="submit()"]')).click();
>11     debugger;
 12     element(by.cssContainingText('', 'Administration')).click();
 13 
debug> by
ReferenceError: by is not defined
    at repl:1:1
    at Object.exports.runInContext (vm.js:44:17)
    at Interface.controlEval (_debugger.js:952:21)
    at bound (domain.js:250:14)
    at REPLServer.runBound [as eval] (domain.js:263:12)
    at REPLServer.<anonymous> (repl.js:392:12)
    at emitOne (events.js:77:13)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:210:10)
    at REPLServer.Interface._line (readline.js:546:8)
debug> repl
Press Ctrl + C to leave debug repl
> by
{}
> by.cssContainingText
[Function]
> 
~~~

### Sample

- demo-spec.js (包含使用者登入換頁 Ajax 查詢資料, etc)

### Reference

- API: http://angular.github.io/protractor/#/api?view=ProtractorBy ( read this! )
- ref: https://teamgaslight.com/blog/getting-started-with-protractor-and-page-objects-for-angularjs-e2e-testing
- ref: http://stackoverflow.com/questions/5441680/css-selector-based-on-element-text
- ref: http://luxiyalu.com/protractor-locators-selectors/
- ref: https://github.com/angular/protractor/blob/master/docs/locators.md
- ref: http://stackoverflow.com/questions/22807393/angularjs-protractor-wait-for-all-ajax-calls-to-end-full-page-load-before-r ( wait for condition )
- ref: http://www.ngroutes.com/questions/1be1ee8/how-to-check-the-presence-of-a-dom-element-in-protractor.html
- ref: http://fixany.xyz/testing-an-event-while-an-ajax-call-is-in-progress-using-protractor-angular-2256/
- ref: https://angular.github.io/protractor/#/api?view=Protractor.prototype.findElement ( wait util find element you want. )
- ref: http://stackoverflow.com/questions/24087470/error-when-calling-findelement-after-findelements-on-webdriver-webelement-using ( wait util find element you want. )
- ref: http://stackoverflow.com/questions/28858339/tell-protractor-to-wait-for-the-page-before-executing-expect
