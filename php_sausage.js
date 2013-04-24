builder.selenium2.io.addLangFormatter({
    name: "PHP/Sausage",
    extension: ".php",
    not: "! ",
    start: "",
    end: "",
    lineForType: {
        "get":
            "$this->open({url});\n",
        "goBack":
            "$this->back();\n",
        "goForward":
            "$this->forward();\n",
        "refresh":
            "$this->refresh();\n",
        "clickElement":
            "$this->element($this->using({locatorBy})->value({locator}))->click();\n",
        "setElementText":
            "$this->element($this->using({locatorBy})->value({locator}))->click();\n"+
                "$this->element($this->using({locatorBy})->value({locator}))->clear();\n"+
                "$this->element($this->using({locatorBy})->value({locator}))->value($this->split_keys({text}));\n",
        "sendKeysToElement":
            "$this->element($this->using({locatorBy})->value({locator}))->click();\n" +
                "$this->element($this->using({locatorBy})->value({locator}))->value($this->split_keys({text}));\n",
        "setElementSelected":
            "if (!($this->element($this->using({locatorBy})->value({locator}))->selected())) {\n" +
                "    $this->element($this->using({locatorBy})->value({locator}))->click();\n"+
                "}\n",
        "setElementNotSelected":
            "if ($this->element($this->using({locatorBy})->value({locator}))->selected()) {\n" +
                "    $this->element($this->using({locatorBy})->value({locator}))->click();\n"+
                "}\n",
        "submitElement":
            "$this->element($this->using({locatorBy})->value({locator}))->submit();\n",
        "close":
            "",
        "switchToFrame":
            "$this->frame(array(\"id\" => {identifier}));\n",
        "switchToFrameByIndex":
            "$this->frame(array(\"id\" => {index}));\n",
        "switchToWindow":
            "$this->window(array(\"name\" => {name}));\n",
        "switchToDefaultContent":
            "$this->frame(array(\"id\" => NULL));\n",
        "answerAlert":
            "$this->postalert_text(array(\"text\" => {text}));\n" +
                "$this->accept_alert();\n",
        "acceptAlert":
            "$this->accept_alert();\n",
        "dismissAlert":
            "$this->dismiss_alert();\n",
        "print":
            "echo {text};\n",
        "store":
            "${variable} = {text};\n"
    },
    locatorByForType: function(stepType, locatorType, locatorIndex) {
        return {
            "class": "\"class\"",
            "id": "\"id\"",
            "link text": "\"link text\"",
            "xpath": "\"xpath\"",
            "css selector": "\"css selector\"",
            "name": "\"name\""}[locatorType];
    },
    assert: function(step, escapeValue, doSubs, getter) {
        if (step.negated) {
            return doSubs(
                "if ({getter} == {cmp}) {\n" +
                    "    $this->close();\n" +
                    "    throw new Exception(\"!{stepTypeName} failed\");\n" +
                    "}\n", getter);
        } else {
            switch (step.type.name) {
                case "assertCurrentUrl":
                case "assertTitle":
                case "assertText":
                case "assertElementAttribute":
                case "assertElementValue":
                case "assertAlertText":
                    return doSubs(
                        "$this->assertEquals({getter},{cmp});\n",getter);
                    break;
                case "assertBodyText":
                case "assertPageSource":
                    return doSubs(
                        "$this->assertContains({cmp},{getter});\n",getter);
                    break;
                default:
                    return doSubs(
                        step.type.name + " ({getter} != {cmp}) {\n" +
                            "    $this->close();\n" +
                            "    throw new Exception(\"!{stepTypeName} failed\");\n" +
                            "}\n", getter);
                    break;
            }
        }
    },
    verify: function(step, escapeValue, doSubs, getter) {
        if (step.negated) {
            return doSubs(
                "if ({getter} == {cmp}) {\n" +
                    "    echo \"!{stepTypeName} failed\";\n" +
                    "}\n", getter);
        } else {
            switch (step.type.name) {
                case "verifyCurrentUrl":
                case "assertTitle":
                case "assertText":
                case "assertElementAttribute":
                case "assertElementValue":
                case "assertAlertText":
                    return doSubs(
                        "if({getter} != {cmp}){echo \"{stepTypeName} failed \";};\n",getter);
                    break;
                case "assertBodyText":
                case "assertPageSource":
                    return doSubs(
                        "$this->assertContains({cmp},{getter});\n",getter);
                    break;
                default:
                    return doSubs(
                        step.type.name + " ({getter} != {cmp}) {\n" +
                            "    $this->close();\n" +
                            "    throw new Exception(\"!{stepTypeName} failed\");\n" +
                            "}\n", getter);
                    break;
            }
        }
    },
    waitFor: "",
    store:
        "${{variable}} = {getter};\n",
    boolean_assert:
        "$this->assertTrue({negNot}{getter},'{stepTypeName} failed');\n",
    boolean_verify:
        "$this->assertTrue({negNot}{getter});\n",
    boolean_waitFor: "",
    boolean_store:
        "${{variable}} = {getter};\n",
    boolean_getters: {
        "TextPresent": {
            getter: "(strpos($this->element($this->using(\"tag name\")->value(\"html\"))->text(), {text}) !== false)",
            vartype: ""
        },
        "ElementPresent": {
            getter: "($this->element($this->using({locatorBy})->value({locator})) instanceof PHPUnit_Extensions_Selenium2TestCase_Element)",
            vartype: ""
        },
        "ElementSelected": {
            getter: "($this->element($this->using({locatorBy})->value({locator}))->selected())",
            vartype: ""
        },
        "CookiePresent": {
            getter: "($this->getAllCookie({name}))",
            vartype: ""
        },
        "AlertPresent": {
            getter: "alert_present($this)",
            vartype: ""
        }
    },
    getters: {
        "BodyText": {
            getter: "$this->element($this->using(\"tag name\")->value(\"html\"))->text()",
            cmp: "{text}",
            vartype: ""
        },
        "PageSource": {
            getter: "$this->source()",
            cmp: "{source}",
            vartype: ""
        },
        "Text": {
            getter: "$this->element($this->using({locatorBy})->value({locator}))->text()",
            cmp: "{text}",
            vartype: ""
        },
        "CurrentUrl": {
            getter: "$this->url()",
            cmp: "{url}",
            vartype: ""
        },
        "Title": {
            getter: "$this->title()",
            cmp: "{title}",
            vartype: ""
        },
        "ElementValue": {
            getter: "$this->element($this->using({locatorBy})->value({locator}))->attribute(\"value\")",
            cmp: "{value}",
            vartype: ""
        },
        "ElementAttribute": {
            getter: "$this->element($this->using({locatorBy})->value({locator}))->attribute({attributeName})",
            cmp: "{value}",
            vartype: "String"
        },
        "CookieByName": {
            getter: "get_cookie($this->getAllCookies(), {name})",
            cmp: "{value}",
            vartype: ""
        },
        "AlertText": {
            getter: "$this->alert_text()",
            cmp: "{text}",
            vartype: ""
        }
    },
    /**
     * Processes a parameter value into an appropriately escaped expression. Mentions of variables
     * with the ${foo} syntax are transformed into expressions that concatenate the variables and
     * literals.
     * For example:
     * a${b}c
     * becomes:
     * "a" . b . "c"
     *
     */
    escapeValue: function(stepType, value, pName) {
        if (stepType.name.startsWith("store") && pName == "variable") { return value; }
        if (stepType.name == "switchToFrameByIndex" && pName == "index") { return value; }
        // This function takes a string literal and escapes it and wraps it in quotes.
        function esc(v) { return "\"" + v.replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\""; }

        // The following is a transducer that produces the escaped expression by going over each
        // character of the input.
        var output = "";       // Escaped expression.
        var lastChunk = "";    // Accumulates letters of the current literal.
        var hasDollar = false; // Whether we've just encountered a $ character.
        var insideVar = false; // Whether we are reading in the name of a variable.
        var varName = "";      // Accumulates letters of the current variable.
        for (var i = 0; i < value.length; i++) {
            var ch = value.substring(i, i + 1);
            if (insideVar) {
                if (ch == "}") {
                    // We've finished reading in the name of a variable.
                    // If this isn't the start of the expression, use + to concatenate it.
                    if (output.length > 0) { output += " . "; }
                    output += "$" + varName;
                    insideVar = false;
                    hasDollar = false;
                    varName = "";
                } else {
                    // This letter is part of the name of the variable we're reading in.
                    varName += ch;
                }
            } else {
                // We're not currently reading in the name of a variable.
                if (hasDollar) {
                    // But we *have* just encountered a $, so if this character is a {, we are about to
                    // do a variable.
                    if (ch == "{") {
                        insideVar = true;
                        if (lastChunk.length > 0) {
                            // Add the literal we've read in to the text.
                            if (output.length > 0) { output += " . "; }
                            output += esc(lastChunk);
                        }
                        lastChunk = "";
                    } else {
                        // No, it was just a lone $.
                        hasDollar = false;
                        lastChunk += "$" + ch;
                    }
                } else {
                    // This is the "normal case" - accumulating the letters of a literal. Unless the letter
                    // is a $, in which case this may be the start of a...
                    if (ch == "$") { hasDollar = true; } else { lastChunk += ch; }
                }
            }
        }
        // Append the final literal, if any, to the output.
        if (lastChunk.length > 0) {
            if (output.length > 0) { output += " . "; }
            output += esc(lastChunk);
        }
        return output;
    },
    usedVar: function(varName) { return "$" + varName; },
    unusedVar: function(varName) { return "$" + varName; }
});