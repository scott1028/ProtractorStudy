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
webdriver-manager start           // 務必要啟動，而且 JDK 版本太低會出錯！
protractor conf.js
~~~
