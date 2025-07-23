
export const integrationProblems: { [key: string]: any[] } = {
  'u-substitution': [
    {
      problem: '\\int 2x(x^2 + 1)^3 \\, dx',
      answers: ['(x^2 + 1)^4/2 + C', '(x^2+1)^4/2+C', '0.5(x^2+1)^4+C'],
      hint: 'Let u = x² + 1, then du = 2x dx'
    },
    {
      problem: '\\int \\frac{x}{\\sqrt{x^2 + 4}} \\, dx',
      answers: ['sqrt(x^2 + 4) + C', '√(x^2+4)+C', '(x^2+4)^(1/2)+C'],
      hint: 'Let u = x² + 4, then du = 2x dx'
    },
    {
      problem: '\\int e^{3x} \\, dx',
      answers: ['e^(3x)/3 + C', 'e^(3x)/3+C', '(1/3)e^(3x)+C'],
      hint: 'Let u = 3x, then du = 3 dx'
    },
    {
      problem: '\\int \\sin(2x) \\, dx',
      answers: ['-cos(2x)/2 + C', '-cos(2x)/2+C', '-(1/2)cos(2x)+C'],
      hint: 'Let u = 2x, then du = 2 dx'
    },
    {
      problem: '\\int x \\sqrt{x^2 + 1} \\, dx',
      answers: ['(x^2 + 1)^(3/2)/3 + C', '(x^2+1)^(3/2)/3+C', '(1/3)(x^2+1)√(x^2+1)+C'],
      hint: 'Let u = x² + 1, then du = 2x dx'
    }
  ],
  'trig-substitution': [
    {
      problem: '\\int \\frac{1}{\\sqrt{4 - x^2}} \\, dx',
      answers: ['arcsin(x/2) + C', 'asin(x/2)+C', 'sin^(-1)(x/2)+C'],
      hint: 'Use x = 2sin(θ), dx = 2cos(θ)dθ'
    },
    {
      problem: '\\int \\frac{1}{x^2 + 9} \\, dx',
      answers: ['arctan(x/3)/3 + C', 'atan(x/3)/3+C', '(1/3)tan^(-1)(x/3)+C'],
      hint: 'Use x = 3tan(θ), dx = 3sec²(θ)dθ'
    },
    {
      problem: '\\int \\frac{1}{\\sqrt{x^2 - 1}} \\, dx',
      answers: ['ln|x + sqrt(x^2 - 1)| + C', 'ln|x+√(x^2-1)|+C', 'arcsec(x)+C'],
      hint: 'Use x = sec(θ), dx = sec(θ)tan(θ)dθ'
    },
    {
      problem: '\\int \\sqrt{9 - x^2} \\, dx',
      answers: ['(x/2)sqrt(9-x^2) + (9/2)arcsin(x/3) + C', '(x/2)√(9-x^2)+(9/2)sin^(-1)(x/3)+C'],
      hint: 'Use x = 3sin(θ), dx = 3cos(θ)dθ'
    },
    {
      problem: '\\int \\frac{x^2}{\\sqrt{x^2 + 4}} \\, dx',
      answers: ['(x/2)sqrt(x^2+4) - 2ln|x+sqrt(x^2+4)| + C', '(x/2)√(x^2+4)-2ln|x+√(x^2+4)|+C'],
      hint: 'Use x = 2tan(θ), dx = 2sec²(θ)dθ'
    }
  ],
  'integration-by-parts': [
    {
      problem: '\\int x e^x \\, dx',
      answers: ['x*e^x - e^x + C', 'xe^x-e^x+C', 'e^x(x-1)+C'],
      hint: 'Let u = x, dv = e^x dx'
    },
    {
      problem: '\\int x \\sin(x) \\, dx',
      answers: ['-x*cos(x) + sin(x) + C', '-xcos(x)+sin(x)+C', 'sin(x)-xcos(x)+C'],
      hint: 'Let u = x, dv = sin(x) dx'
    },
    {
      problem: '\\int \\ln(x) \\, dx',
      answers: ['x*ln(x) - x + C', 'xln(x)-x+C', 'x(ln(x)-1)+C'],
      hint: 'Let u = ln(x), dv = dx'
    },
    {
      problem: '\\int x^2 e^x \\, dx',
      answers: ['x^2*e^x - 2x*e^x + 2*e^x + C', 'x^2*e^x-2xe^x+2e^x+C', 'e^x(x^2-2x+2)+C'],
      hint: 'Use integration by parts twice: u = x², dv = e^x dx'
    },
    {
      problem: '\\int e^x \\cos(x) \\, dx',
      answers: ['(e^x/2)(sin(x) + cos(x)) + C', '(e^x/2)(sin(x)+cos(x))+C', '0.5*e^x*(sin(x)+cos(x))+C'],
      hint: 'Use integration by parts twice, or let u = e^x, dv = cos(x) dx'
    }
  ],
  'mixed': [
    {
      problem: '\\int \\frac{2x + 1}{x^2 + x + 1} \\, dx',
      answers: ['ln|x^2 + x + 1| + C', 'ln|x^2+x+1|+C'],
      hint: 'Notice that the numerator is the derivative of the denominator'
    },
    {
      problem: '\\int x^3 \\sqrt{1 + x^2} \\, dx',
      answers: ['(1/5)(1+x^2)^(5/2) - (1/3)(1+x^2)^(3/2) + C'],
      hint: 'Use u-substitution with u = 1 + x²'
    },
    {
      problem: '\\int \\frac{\\sin(\\ln(x))}{x} \\, dx',
      answers: ['-cos(ln(x)) + C', '-cos(ln(x))+C'],
      hint: 'Let u = ln(x), then du = dx/x'
    },
    {
      problem: '\\int \\frac{x}{(x^2 + 1)^2} \\, dx',
      answers: ['-1/(2(x^2 + 1)) + C', '-1/(2(x^2+1))+C', '-(1/2)(x^2+1)^(-1)+C'],
      hint: 'Let u = x² + 1, then du = 2x dx'
    },
    {
      problem: '\\int x \\arctan(x) \\, dx',
      answers: ['(x^2/2)*arctan(x) - x/2 + arctan(x)/2 + C', '(x^2/2)arctan(x)-x/2+arctan(x)/2+C'],
      hint: 'Use integration by parts with u = arctan(x)'
    }
  ]
};
