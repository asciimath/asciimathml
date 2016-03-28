jest.dontMock('../index');

var AMTinit = require('../index');

function testConversion(asciiMath, expectedLatex) {

}

var testCases = [
    {
        input: 'x^2', 
        expectedOutput:'{x}^{{2}}',
    }, 
    {
        input: 'y = (-b +- sqrt(b^2-4ac))/ 2a',
        expectedOutput: '{y}=\\frac{{-{b}\\pm\\sqrt{{{b}^{{2}}-{4}{a}{c}}}}}{{2}}{a}',
    },
];

describe('all these test cases', function () {
    testCases.forEach(function(testCase, index) {
        it('passes #' + index, function () {
            converter = AMTinit();
            var latex = converter(testCase.input);
            
            expect(latex).toBe(testCase.expectedOutput);
        });
    });
});
