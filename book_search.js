/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    var matches = [];
    var matchLocal = [];
    // We first need to turn JSON to JS obj
    var inputArray = scannedTextObj;
    let txt = "";
    // Now we can go through each of the contents and look for the text
    // for (let i = 0; i < inputArray.length; i++) {
    //     txt = inputArray[i].Text;

    //     for (let j=0; j < searchTerm.length; j++) {
    //         if (txt(i+j)=='-') {
    //             break;
    //         }
    //         if (searchTerm.charAt(j)!=txt(i+j)) {
    //             j = searchTerm.length;
    //         }
            
    // }

        
    // }
    // first, pull out the contents
    for (let n=0; n<inputArray.length; n++) {
        var bookContent = inputArray[n].Content;
        //now, pull out the text
        for (let j = 0; j < bookContent.length; j++) {
            currText = bookContent[j].Text;
            // now, lets remove the hyphens at the end of lines
            if (currText.charAt(currText.length-1)=="-") {
                currText = currText.substring(0,currText.length-1);
            }
            // and concatenate the text into one string.
            txt = txt.concat(currText);
        }
        //now, compare searchTerm to Text
        for (let i = 0; i<txt.length-(searchTerm.length-1); i++) {
            if (txt.substring(i, i+searchTerm.length) == searchTerm) {
                matches.push(i);
            }
        }
        
        /* now that we have all the indices for the matches, we
        can add the corresponding lines to the results.
        */
        for (let i=0; i<matches.length; i++) {
            let startPosition = matches.shift();

            for (let j = 0; j < bookContent.length; j++) {
                currText = bookContent[j].Text;

                if (currText.charAt(currText.length-1)=='-') {
                    currText = currText.substring(0,currText.length-1);
                }

                if (startPosition-currText.length <= 0) {
                    matchLocal.push(["ISBN:" + inputArray[n].ISBN, "Page:" + bookContent[j].Page, "Line:" + bookContent[j].Line]);
                    startPosition = 1/0;
                }
                
                else { 
                    startPosition -= currText.length;
                    }
                
            }
        }
    }
    var result = {
        "SearchTerm": searchTerm,
        "Results": matchLocal
    };
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}
const test3result = findSearchTermInBooks("Canadian", twentyLeaguesIn); 
if (test3result.Results.length == 1) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", 1);
    console.log("Received:", test3result.Results.length);
}
const test4result = findSearchTermInBooks("taco", twentyLeaguesIn); 
if (test4result.Results.length == 0) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", 0);
    console.log("Received:", test4result.Results.length);
}
const test5result = findSearchTermInBooks("canadian", twentyLeaguesIn); 
if (test5result.Results.length == 0) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", 0);
    console.log("Received:", test5result.Results.length);
}
