var unittests = [
//single symbol output
{input: "!=", output:"<mo>≠</mo>"},
{input: "!in", output:"<mo>∉</mo>"},
{input: "'", output:"<mo>′</mo>"},
{input: "(", output:"<mrow><mo>(</mo><mo></mo></mrow>"},
{input: "(:", output:"<mrow><mo>〈</mo><mo></mo></mrow>"},
{input: ")", output:"<mo>)</mo>"},
{input: "*", output:"<mo>⋅</mo>"},
{input: "**", output:"<mo>∗</mo>"},
{input: "***", output:"<mo>⋆</mo>"},
{input: "+-", output:"<mo>±</mo>"},
{input: "-", output:"<mo>−</mo>"},
{input: "-:", output:"<mo>÷</mo>"},
{input: "-<", output:"<mo>≺</mo>"},
{input: "-<=", output:"<mo>⪯</mo>"},
{input: "-=", output:"<mo>≡</mo>"},
{input: "->", output:"<mo>→</mo>"},
{input: "->>", output:"<mo>↠</mo>"},
{input: "-lt", output:"<mo>≺</mo>"},
{input: "...", output:"<mo>...</mo>"},
{input: "/", output:"<mo>/</mo>"},
{input: "//", output:"<mo>/</mo>"},
{input: "/_", output:"<mo>∠</mo>"},
{input: "/_\\", output:"<mo>△</mo>"},
{input: ":)", output:"<mo>〉</mo>"},
{input: ":.", output:"<mo>∴</mo>"},
{input: ":=", output:"<mo>:=</mo>"},
{input: ":}", output:"<mo>:}</mo>"},
{input: "<<", output:"<mrow><mo>〈</mo><mo></mo></mrow>"},
{input: "<=", output:"<mo>≤</mo>"},
{input: "<=>", output:"<mo>⇔</mo>"},
{input: "=>", output:"<mo>⇒</mo>"},
{input: ">-", output:"<mo>≻</mo>"},
{input: ">-=", output:"<mo>⪰</mo>"},
{input: ">->", output:"<mo>↣</mo>"},
{input: ">->>", output:"<mo>⤖</mo>"},
{input: "><|", output:"<mo>⋊</mo>"},
{input: ">=", output:"<mo>≥</mo>"},
{input: ">>", output:"<mo>〉</mo>"},
{input: "@", output:"<mo>∘</mo>"},
{input: "AA", output:"<mo>∀</mo>"},
{input: "CC", output:"<mo>ℂ</mo>"},
{input: "Delta", output:"<mo>Δ</mo>"},
{input: "EE", output:"<mo>∃</mo>"},
{input: "Gamma", output:"<mo>Γ</mo>"},
{input: "Lambda", output:"<mo>Λ</mo>"},
{input: "Lamda", output:"<mo>Λ</mo>"},
{input: "Leftarrow", output:"<mo>⇐</mo>"},
{input: "Leftrightarrow", output:"<mo>⇔</mo>"},
{input: "Lim", output:"<mo>Lim</mo>"},
{input: "NN", output:"<mo>ℕ</mo>"},
{input: "O/", output:"<mo>∅</mo>"},
{input: "Omega", output:"<mo>Ω</mo>"},
{input: "Phi", output:"<mo>Φ</mo>"},
{input: "Pi", output:"<mo>Π</mo>"},
{input: "Psi", output:"<mi>Ψ</mi>"},
{input: "QQ", output:"<mo>ℚ</mo>"},
{input: "RR", output:"<mo>ℝ</mo>"},
{input: "Rightarrow", output:"<mo>⇒</mo>"},
{input: "Sigma", output:"<mo>Σ</mo>"},
{input: "TT", output:"<mo>⊤</mo>"},
{input: "Theta", output:"<mo>Θ</mo>"},
{input: "Xi", output:"<mo>Ξ</mo>"},
{input: "ZZ", output:"<mo>ℤ</mo>"},
{input: "[", output:"<mrow><mo>[</mo><mo></mo></mrow>"},
{input: "\\ ", output:"<mo>&nbsp;</mo>"},
{input: "\\\\", output:"<mo>\\</mo>"},
{input: "]", output:"<mo>]</mo>"},
{input: "^", output:"<mo>^</mo>"},
{input: "^^", output:"<mo>∧</mo>"},
{input: "^^^", output:"<mo>⋀</mo>"},
{input: "_", output:"<mo>_</mo>"},
{input: "__|", output:"<mo>⌋</mo>"},
{input: "_|_", output:"<mo>⊥</mo>"},
{input: "abs", output:"<mrow><mo>|</mo><mo></mo><mo>|</mo></mrow>"},
{input: "aleph", output:"<mo>ℵ</mo>"},
{input: "alpha", output:"<mi>α</mi>"},
{input: "and", output:"<mrow><mspace width=\"1ex\"></mspace><mtext>and</mtext><mspace width=\"1ex\"></mspace></mrow>"},
{input: "angle", output:"<mo>∠</mo>"},
{input: "approx", output:"<mo>≈</mo>"},
{input: "arccos", output:"<mrow><mo>arccos</mo><mo></mo></mrow>"},
{input: "arcsin", output:"<mrow><mo>arcsin</mo><mo></mo></mrow>"},
{input: "arctan", output:"<mrow><mo>arctan</mo><mo></mo></mrow>"},
{input: "ast", output:"<mo>∗</mo>"},
{input: "backslash", output:"<mo>\\</mo>"},
{input: "bar", output:'<mover accent="true"><mo></mo><mo stretchy="true">¯</mo></mover>'},
{input: "beta", output:"<mi>β</mi>"},
{input: "bigcap", output:"<mo>⋂</mo>"},
{input: "bigcup", output:"<mo>⋃</mo>"},
{input: "bigvee", output:"<mo>⋁</mo>"},
{input: "bigwedge", output:"<mo>⋀</mo>"},
{input: "bot", output:"<mo>⊥</mo>"},
{input: "bowtie", output:"<mo>⋈</mo>"},
{input: "cap", output:"<mo>∩</mo>"},
{input: "cdot", output:"<mo>⋅</mo>"},
{input: "cdots", output:"<mo>⋯</mo>"},
{input: "ceil", output:"<mrow><mo>⌈</mo><mo></mo><mo>⌉</mo></mrow>"},
{input: "chi", output:"<mi>χ</mi>"},
{input: "circ", output:"<mo>∘</mo>"},
{input: "cong", output:"<mo>≅</mo>"},
{input: "cos", output:"<mrow><mo>cos</mo><mo></mo></mrow>"},
{input: "cosh", output:"<mrow><mo>cosh</mo><mo></mo></mrow>"},
{input: "cot", output:"<mrow><mo>cot</mo><mo></mo></mrow>"},
{input: "coth", output:"<mrow><mo>coth</mo><mo></mo></mrow>"},
{input: "csc", output:"<mrow><mo>csc</mo><mo></mo></mrow>"},
{input: "csch", output:"<mrow><mo>csch</mo><mo></mo></mrow>"},
{input: "cup", output:"<mo>∪</mo>"},
{input: "dag", output:"<mo>†</mo>"},
{input: "dagger", output:"<mo>†</mo>"},
{input: "darr", output:"<mo>↓</mo>"},
{input: "dArr", output:"<mo>⇓</mo>"},
{input: "ddag", output:"<mo>‡</mo>"},
{input: "ddagger", output:"<mo>‡</mo>"},
{input: "ddot", output:'<mover accent="true"><mo></mo><mo stretchy="true">..</mo></mover>'},
{input: "ddots", output:"<mo>⋱</mo>"},
{input: "del", output:"<mo>∂</mo>"},
{input: "delta", output:"<mi>δ</mi>"},
{input: "det", output:"<mrow><mo>det</mo><mo></mo></mrow>"},
{input: "diamond", output:"<mo>⋄</mo>"},
{input: "dim", output:"<mo>dim</mo>"},
{input: "div", output:"<mo>÷</mo>"},
{input: "divide", output:"<mo>÷</mo>"},
{input: "dot", output:'<mover accent="true"><mo></mo><mo stretchy="true">.</mo></mover>'},
{input: "downarrow", output:"<mo>↓</mo>"},
{input: "dt", output:"<mrow><mi>d</mi><mi>t</mi></mrow>"},
{input: "dx", output:"<mrow><mi>d</mi><mi>x</mi></mrow>"},
{input: "dy", output:"<mrow><mi>d</mi><mi>y</mi></mrow>"},
{input: "dz", output:"<mrow><mi>d</mi><mi>z</mi></mrow>"},
{input: "emptyset", output:"<mo>∅</mo>"},
{input: "epsi", output:"<mi>ε</mi>"},
{input: "epsilon", output:"<mi>ε</mi>"},
{input: "equiv", output:"<mo>≡</mo>"},
{input: "eta", output:"<mi>η</mi>"},
{input: "exists", output:"<mo>∃</mo>"},
{input: "exp", output:"<mrow><mo>exp</mo><mo></mo></mrow>"},
{input: "f", output:"<mi>f</mi>"},
{input: "floor", output:"<mrow><mo>⌊</mo><mo></mo><mo>⌋</mo></mrow>"},
{input: "forall", output:"<mo>∀</mo>"},
{input: "frown", output:"<mo>⌢</mo>"},
{input: "g", output:"<mi>g</mi>"},
{input: "gamma", output:"<mi>γ</mi>"},
{input: "gcd", output:"<mrow><mo>gcd</mo><mo></mo></mrow>"},
{input: "ge", output:"<mo>≥</mo>"},
{input: "geq", output:"<mo>≥</mo>"},
{input: "glb", output:"<mo>glb</mo>"},
{input: "grad", output:"<mo>∇</mo>"},
{input: "gt", output:"<mo>&gt;</mo>"},
{input: "mgt", output:"<mo>≫</mo>"},
{input: "gt=", output:"<mo>≥</mo>"},
{input: "hArr", output:"<mo>⇔</mo>"},
{input: "harr", output:"<mo>↔</mo>"},
{input: "hat", output:'<mover accent="true"><mo></mo><mo stretchy="true">̂</mo></mover>'},
{input: "if", output:"<mrow><mspace width=\"1ex\"></mspace><mo>if</mo><mspace width=\"1ex\"></mspace></mrow>"},
{input: "iff", output:"<mo>⇔</mo>"},
{input: "implies", output:"<mo>⇒</mo>"},
{input: "in", output:"<mo>∈</mo>"},
{input: "infty", output:"<mo>∞</mo>"},
{input: "int", output:"<mo>∫</mo>"},
{input: "iota", output:"<mi>ι</mi>"},
{input: "kappa", output:"<mi>κ</mi>"},
{input: "lArr", output:"<mo>⇐</mo>"},
{input: "lambda", output:"<mi>λ</mi>"},
{input: "lamda", output:"<mi>λ</mi>"},
{input: "langle", output:"<mrow><mo>〈</mo><mo></mo></mrow>"},
{input: "larr", output:"<mo>←</mo>"},
{input: "lceiling", output:"<mo>⌈</mo>"},
{input: "lcm", output:"<mrow><mo>lcm</mo><mo></mo></mrow>"},
{input: "ldots", output:"<mo>...</mo>"},
{input: "le", output:"<mo>≤</mo>"},
{input: "leftarrow", output:"<mo>←</mo>"},
{input: "leftrightarrow", output:"<mo>↔</mo>"},
{input: "leq", output:"<mo>≤</mo>"},
{input: "lfloor", output:"<mo>⌊</mo>"},
{input: "lim", output:"<mo>lim</mo>"},
{input: "ln", output:"<mrow><mo>ln</mo><mo></mo></mrow>"},
{input: "log", output:"<mrow><mo>log</mo><mo></mo></mrow>"},
{input: "lt", output:"<mo>&lt;</mo>"},
{input: "mlt", output:"<mo>≪</mo>"},
{input: "lt=", output:"<mo>≤</mo>"},
{input: "ltimes", output:"<mo>⋉</mo>"},
{input: "lub", output:"<mo>lub</mo>"},
{input: "mapsto", output:"<mo>↦</mo>"},
{input: "max", output:"<mo>max</mo>"},
{input: "min", output:"<mo>min</mo>"},
{input: "mod", output:"<mo>mod</mo>"},
{input: "models", output:"<mo>⊨</mo>"},
{input: "mu", output:"<mi>μ</mi>"},
{input: "nabla", output:"<mo>∇</mo>"},
{input: "ne", output:"<mo>≠</mo>"},
{input: "neg", output:"<mo>¬</mo>"},
{input: "nn", output:"<mo>∩</mo>"},
{input: "nnn", output:"<mo>⋂</mo>"},
{input: "norm", output:"<mrow><mo>∥</mo><mo></mo><mo>∥</mo></mrow>"},
{input: "not", output:"<mo>¬</mo>"},
{input: "notin", output:"<mo>∉</mo>"},
{input: "nu", output:"<mi>ν</mi>"},
{input: "o+", output:"<mo>⊕</mo>"},
{input: "o.", output:"<mo>⊙</mo>"},
{input: "obrace", output:'<mover><mo></mo><mo stretchy="true">⏞</mo></mover>'},
{input: "odot", output:"<mo>⊙</mo>"},
{input: "oint", output:"<mo>∮</mo>"},
{input: "omega", output:"<mi>ω</mi>"},
{input: "oo", output:"<mo>∞</mo>"},
{input: "oplus", output:"<mo>⊕</mo>"},
{input: "or", output:"<mrow><mspace width=\"1ex\"></mspace><mtext>or</mtext><mspace width=\"1ex\"></mspace></mrow>"},
{input: "otimes", output:"<mo>⊗</mo>"},
{input: "overbrace", output:'<mover><mo></mo><mo stretchy="true">⏞</mo></mover>'},
{input: "overline", output:'<mover accent="true"><mo></mo><mo stretchy="true">¯</mo></mover>'},
{input: "ox", output:"<mo>⊗</mo>"},
{input: "partial", output:"<mo>∂</mo>"},
{input: "phi", output:"<mi>ϕ</mi>"},
{input: "pi", output:"<mi>π</mi>"},
{input: "pm", output:"<mo>±</mo>"},
{input: "prec", output:"<mo>≺</mo>"},
{input: "preceq", output:"<mo>⪯</mo>"},
{input: "prime", output:"<mo>′</mo>"},
{input: "prod", output:"<mo>∏</mo>"},
{input: "prop", output:"<mo>∝</mo>"},
{input: "propto", output:"<mo>∝</mo>"},
{input: "psi", output:"<mi>ψ</mi>"},
{input: "qquad", output:"<mo>&nbsp;&nbsp;&nbsp;&nbsp;</mo>"},
{input: "quad", output:"<mo>&nbsp;&nbsp;</mo>"},
{input: "rArr", output:"<mo>⇒</mo>"},
{input: "rangle", output:"<mo>〉</mo>"},
{input: "rarr", output:"<mo>→</mo>"},
{input: "rceiling", output:"<mo>⌉</mo>"},
{input: "rfloor", output:"<mo>⌋</mo>"},
{input: "rho", output:"<mi>ρ</mi>"},
{input: "rightarrow", output:"<mo>→</mo>"},
{input: "rightarrowtail", output:"<mo>↣</mo>"},
{input: "root", output:"<mroot><mo></mo><mo></mo></mroot>"},
{input: "rtimes", output:"<mo>⋊</mo>"},
{input: "sec", output:"<mrow><mo>sec</mo><mo></mo></mrow>"},
{input: "sech", output:"<mrow><mo>sech</mo><mo></mo></mrow>"},
{input: "setminus", output:"<mo>\\</mo>"},
{input: "sigma", output:"<mi>σ</mi>"},
{input: "sin", output:"<mrow><mo>sin</mo><mo></mo></mrow>"},
{input: "sinh", output:"<mrow><mo>sinh</mo><mo></mo></mrow>"},
{input: "sqrt", output:"<msqrt><mo></mo></msqrt>"},
{input: "square", output:"<mo>□</mo>"},
{input: "stackrel", output:"<mover><mo></mo><mo></mo></mover>"},
{input: "star", output:"<mo>⋆</mo>"},
{input: "sub", output:"<mo>⊂</mo>"},
{input: "sube", output:"<mo>⊆</mo>"},
{input: "subset", output:"<mo>⊂</mo>"},
{input: "subseteq", output:"<mo>⊆</mo>"},
{input: "succ", output:"<mo>≻</mo>"},
{input: "succeq", output:"<mo>⪰</mo>"},
{input: "sum", output:"<mo>∑</mo>"},
{input: "sup", output:"<mo>⊃</mo>"},
{input: "supe", output:"<mo>⊇</mo>"},
{input: "supset", output:"<mo>⊃</mo>"},
{input: "supseteq", output:"<mo>⊇</mo>"},
{input: "tan", output:"<mrow><mo>tan</mo><mo></mo></mrow>"},
{input: "tanh", output:"<mrow><mo>tanh</mo><mo></mo></mrow>"},
{input: "tau", output:"<mi>τ</mi>"},
{input: "therefore", output:"<mo>∴</mo>"},
{input: "theta", output:"<mi>θ</mi>"},
{input: "tilde", output:'<mover accent="true"><mo></mo><mo stretchy="true">~</mo></mover>'},
{input: "times", output:"<mo>×</mo>"},
{input: "to", output:"<mo>→</mo>"},
{input: "top", output:"<mo>⊤</mo>"},
{input: "triangle", output:"<mo>△</mo>"},
{input: "twoheadrightarrow", output:"<mo>↠</mo>"},
{input: "twoheadrightarrowtail", output:"<mo>⤖</mo>"},
{input: "uarr", output:"<mo>↑</mo>"},
{input: "ubrace", output:'<munder><mo></mo><mo stretchy="true">⏟</mo></munder>'},
{input: "ul", output:'<munder accentunder="true"><mo></mo><mo stretchy="true">̲</mo></munder>'},
{input: "underbrace", output:'<munder><mo></mo><mo stretchy="true">⏟</mo></munder>'},
{input: "underline", output:'<munder accentunder="true"><mo></mo><mo stretchy="true">̲</mo></munder>'},
{input: "underset", output:"<munder><mo></mo><mo></mo></munder>"},
{input: "uparrow", output:"<mo>↑</mo>"},
{input: "upsilon", output:"<mi>υ</mi>"},
{input: "uu", output:"<mo>∪</mo>"},
{input: "uuu", output:"<mo>⋃</mo>"},
{input: "varepsilon", output:"<mi>ɛ</mi>"},
{input: "varphi", output:"<mi>φ</mi>"},
{input: "vartheta", output:"<mi>ϑ</mi>"},
{input: "vdash", output:"<mo>⊢</mo>"},
{input: "vdots", output:"<mo>⋮</mo>"},
{input: "vec", output:'<mover accent="true"><mo></mo><mo stretchy="true">→</mo></mover>'},
{input: "vee", output:"<mo>∨</mo>"},
{input: "vv", output:"<mo>∨</mo>"},
{input: "vvv", output:"<mo>⋁</mo>"},
{input: "wedge", output:"<mo>∧</mo>"},
{input: "xi", output:"<mi>ξ</mi>"},
{input: "xx", output:"<mo>×</mo>"},
{input: "zeta", output:"<mi>ζ</mi>"},
{input: "{", output:"<mrow><mo>{</mo><mo></mo></mrow>"},
{input: "|", output:"<mrow><mo>∣</mo></mrow>"},
{input: "|--", output:"<mo>⊢</mo>"},
{input: "|->", output:"<mo>↦</mo>"},
{input: "|==", output:"<mo>⊨</mo>"},
{input: "|><", output:"<mo>⋉</mo>"},
{input: "|><|", output:"<mo>⋈</mo>"},
{input: "|__", output:"<mo>⌊</mo>"},
{input: "|~", output:"<mo>⌈</mo>"},
{input: "}", output:"<mo>}</mo>"},
{input: "~=", output:"<mo>≅</mo>"},
{input: "~|", output:"<mo>⌉</mo>"},
{input: "~~", output:"<mo>≈</mo>"},

//unary, binary, and accents
{input: "f(x)/g(x)", output:"<mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac>"},
{input: "sin(x)/2", output:"<mfrac><mrow><mo>sin</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mn>2</mn></mfrac>"},
{input: "cosx/2", output:"<mfrac><mrow><mo>cos</mo><mi>x</mi></mrow><mn>2</mn></mfrac>"},
{input: "absx", output:"<mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow>"},
{input: "norm x", output:"<mrow><mo>∥</mo><mi>x</mi><mo>∥</mo></mrow>"},
{input: "floor x/2", output:"<mfrac><mrow><mo>⌊</mo><mi>x</mi><mo>⌋</mo></mrow><mn>2</mn></mfrac>"},
{input: "ceil 5.2", output:"<mrow><mo>⌈</mo><mn>5.2</mn><mo>⌉</mo></mrow>"},
{input: "min_x 3", output:"<munder><mo>min</mo><mi>x</mi></munder><mn>3</mn>"},
{input: "sqrt4", output:"<msqrt><mn>4</mn></msqrt>"},
{input: "sqrt(x+1)", output:"<msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msqrt>"},
{input: "root(3)(x)", output:"<mroot><mrow><mi>x</mi></mrow><mrow><mn>3</mn></mrow></mroot>"},
{input: "root3x", output:"<mroot><mi>x</mi><mn>3</mn></mroot>"},
{input: "stackrel3=", output:"<mover><mo>=</mo><mn>3</mn></mover>"},
{input: "stackrel(3)(=)", output:"<mover><mrow><mo>=</mo></mrow><mrow><mn>3</mn></mrow></mover>"},
{input: "overset(k)(=)", output:"<mover><mrow><mo>=</mo></mrow><mrow><mi>k</mi></mrow></mover>"},
{input: "underset(k)(=)", output:"<munder><mrow><mo>=</mo></mrow><mrow><mi>k</mi></mrow></munder>"},
{input: "tilde x", output:'<mover accent="true"><mi>x</mi><mo stretchy="true">~</mo></mover>'},
{input: "hat x", output:'<mover accent="true"><mi>x</mi><mo stretchy="true">̂</mo></mover>'},
{input: "hat(xy)", output:'<mover accent="true"><mrow><mi>x</mi><mi>y</mi></mrow><mo stretchy="true">̂</mo></mover>'},
{input: "bar x", output:'<mover accent="true"><mi>x</mi><mo stretchy="true">¯</mo></mover>'},
{input: "vec x", output:'<mover accent="true"><mi>x</mi><mo stretchy="false">→</mo></mover>'},
{input: "vec(xy)", output:'<mover accent="true"><mrow><mi>x</mi><mi>y</mi></mrow><mo stretchy="true">→</mo></mover>'},
{input: "dot x", output:'<mover accent="true"><mi>x</mi><mo stretchy="true">.</mo></mover>'},
{input: "ddot x", output:'<mover accent="true"><mi>x</mi><mo stretchy="true">..</mo></mover>'},
{input: "ul x", output:'<munder accentunder="true"><mi>x</mi><mo stretchy="true">̲</mo></munder>'},
{input: "ubrace(x+1)", output:'<munder><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo stretchy="true">⏟</mo></munder>'},
{input: "obrace(x+1)", output:'<mover><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo stretchy="true">⏞</mo></mover>'},
{input: "mbox(hi)", output:"<mrow><mtext>hi</mtext></mrow>"},
{input: "text(hi)", output:"<mrow><mtext>hi</mtext></mrow>"},
{input: "\"hi\"", output:"<mrow><mtext>hi</mtext></mrow>"},
{input: "cancel(x)", output:"<menclose notation=\"updiagonalstrike\"><mrow><mi>x</mi></mrow></menclose>"},

//font and color
{input: "color(red)(x)", output:"<mstyle mathcolor=\"red\"><mrow><mi>x</mi></mrow></mstyle>"},
{input: "bb(x)", output:"<mrow><mi>𝐱</mi></mrow>"},
{input: "sf(x)", output:"<mrow><mi>𝗑</mi></mrow>"},
{input: "bbb(x)", output:"<mrow><mi>𝕩</mi></mrow>"},
{input: "cc(x)", output:"<mrow><mi>𝓍</mi></mrow>"},
{input: "tt(x)", output:"<mrow><mi>𝚡</mi></mrow>"},
{input: "fr(x)", output:"<mrow><mi>𝔵</mi></mrow>"},

//basics
{input: "x", output:"<mi>x</mi>"},
{input: "2", output:"<mn>2</mn>"},
{input: "x^2", output:"<msup><mi>x</mi><mn>2</mn></msup>"},
{input: "x_2", output:"<msub><mi>x</mi><mn>2</mn></msub>"},
{input: "x_2^3", output:"<mrow><msubsup><mi>x</mi><mn>2</mn><mn>3</mn></msubsup></mrow>"},
{input: "2/3", output:"<mfrac><mn>2</mn><mn>3</mn></mfrac>"},
{input: "-2/3", output:"<mo>−</mo><mfrac><mn>2</mn><mn>3</mn></mfrac>"},
{input: "2-3", output:"<mn>2</mn><mo>−</mo><mn>3</mn>"},
{input: "(2+3)", output:"<mrow><mo>(</mo><mn>2</mn><mo>+</mo><mn>3</mn><mo>)</mo></mrow>"},

//braces
{input: "2+(3/4+1)", output:"<mn>2</mn><mo>+</mo><mrow><mo>(</mo><mfrac><mn>3</mn><mn>4</mn></mfrac><mo>+</mo><mn>1</mn><mo>)</mo></mrow>"},
{input: "2+[3/4+1]", output:"<mn>2</mn><mo>+</mo><mrow><mo>[</mo><mfrac><mn>3</mn><mn>4</mn></mfrac><mo>+</mo><mn>1</mn><mo>]</mo></mrow>"},
{input: "2+|3/4+1|", output:"<mn>2</mn><mo>+</mo><mrow><mo>|</mo><mfrac><mn>3</mn><mn>4</mn></mfrac><mo>+</mo><mn>1</mn><mo>|</mo></mrow>"},
{input: "[2/3,4)", output:"<mrow><mo>[</mo><mfrac><mn>2</mn><mn>3</mn></mfrac><mo>,</mo><mn>4</mn><mo>)</mo></mrow>"},
{input: "{:2,3:}", output:"<mrow><mn>2</mn><mo>,</mo><mn>3</mn></mrow>"},
{input: "<<2,3>>", output:"<mrow><mo>〈</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>〉</mo></mrow>"},
{input: "(:2,3:)", output:"<mrow><mo>〈</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>〉</mo></mrow>"},

//matrices and arrays
{input: "[(2,3),(4,5)]", output:"<mrow><mo>[</mo><mtable columnlines=\"none none\"><mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable><mo>]</mo></mrow>"},
{input: "[(2,3,4,5)]", output:"<mrow><mo>[</mo><mtable columnlines=\"none none none none\"><mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable><mo>]</mo></mrow>"},
{input: "((1),(2))", output:"<mrow><mo>(</mo><mtable columnlines=\"none\"><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable><mo>)</mo></mrow>"},
{input: "{(1,if,x ge 3),(2,if,x gt 3):}", output:"<mrow><mo>{</mo><mtable columnlines=\"none none none\" columnalign=\"left\"><mtr><mtd><mn>1</mn></mtd><mtd><mrow><mspace width=\"1ex\"></mspace><mo>if</mo><mspace width=\"1ex\"></mspace></mrow></mtd><mtd><mi>x</mi><mo>≥</mo><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mrow><mspace width=\"1ex\"></mspace><mo>if</mo><mspace width=\"1ex\"></mspace></mrow></mtd><mtd><mi>x</mi><mo>&gt;</mo><mn>3</mn></mtd></mtr></mtable></mrow>"},
{input: "[(1,2,|,3),(4,5,|,6)]", output:"<mrow><mo>[</mo><mtable columnlines=\"none solid none\"><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable><mo>]</mo></mrow>"},

//from the existing demos
{input: "int_2^3 3dx", output:"<mrow><msubsup><mo>∫</mo><mn>2</mn><mn>3</mn></msubsup></mrow><mn>3</mn><mrow><mi>d</mi><mi>x</mi></mrow>"},
{input: "sum_(n=1)^3 n", output:"<mrow><munderover><mo>∑</mo><mrow><mi>n</mi><mo>=</mo><mn>1</mn></mrow><mn>3</mn></munderover></mrow><mi>n</mi>"},
{input: "lim_(h->0)(f(x+h)-f(x))/h", output:"<munder><mo>lim</mo><mrow><mi>h</mi><mo>→</mo><mn>0</mn></mrow></munder><mfrac><mrow><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mi>h</mi><mo>)</mo></mrow></mrow><mo>−</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow><mi>h</mi></mfrac>"},
{input: "sin^-1(x)", output:"<mrow><msup><mo>sin</mo><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>"},
{input: "f(x)=sum_(n=0)^oo(f^((n))(a))/(n!)(x-a)^n", output:"<mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>=</mo><mrow><munderover><mo>∑</mo><mrow><mi>n</mi><mo>=</mo><mn>0</mn></mrow><mo>∞</mo></munderover></mrow><mfrac><mrow><mrow><msup><mi>f</mi><mrow><mrow><mo>(</mo><mi>n</mi><mo>)</mo></mrow></mrow></msup><mrow><mo>(</mo><mi>a</mi><mo>)</mo></mrow></mrow></mrow><mrow><mi>n</mi><mo>!</mo></mrow></mfrac><msup><mrow><mo>(</mo><mi>x</mi><mo>−</mo><mi>a</mi><mo>)</mo></mrow><mi>n</mi></msup>"},
{input: "f(x)=\\sum_{n=0}^\\infty\\frac{f^{(n)}(a)}{n!}(x-a)^n", output:"<mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>=</mo><mrow><munderover><mo>∑</mo><mrow><mi>n</mi><mo>=</mo><mn>0</mn></mrow><mo>∞</mo></munderover></mrow><mfrac><mrow><mrow><msup><mi>f</mi><mrow><mrow><mo>(</mo><mi>n</mi><mo>)</mo></mrow></mrow></msup><mrow><mo>(</mo><mi>a</mi><mo>)</mo></mrow></mrow></mrow><mrow><mi>n</mi><mo>!</mo></mrow></mfrac><msup><mrow><mo>(</mo><mi>x</mi><mo>−</mo><mi>a</mi><mo>)</mo></mrow><mi>n</mi></msup>"},
{input: "(a,b]={x in RR | a < x <= b}", output:"<mrow><mo>(</mo><mi>a</mi><mo>,</mo><mi>b</mi><mo>]</mo></mrow><mo>=</mo><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mo>ℝ</mo><mrow><mo>∣</mo></mrow><mi>a</mi><mo>&lt;</mo><mi>x</mi><mo>≤</mo><mi>b</mi><mo>}</mo></mrow>"},
{input: "abc-123.45^-1.1", output:"<mi>a</mi><mi>b</mi><mi>c</mi><mo>−</mo><msup><mn>123.45</mn><mrow><mo>−</mo><mn>1.1</mn></mrow></msup>"},
{input: "stackrel\"def\"= or \\stackrel{\\Delta}{=}", output:"<mover><mo>=</mo><mrow><mtext>def</mtext></mrow></mover><mrow><mspace width=\"1ex\"></mspace><mtext>or</mtext><mspace width=\"1ex\"></mspace></mrow><mover><mrow><mo>=</mo></mrow><mrow><mo>Δ</mo></mrow></mover>"},
{input: "{::}_(\\ 92)^238U", output:"<mrow><msubsup><mrow></mrow><mrow><mo>&nbsp;</mo><mn>92</mn></mrow><mn>238</mn></msubsup></mrow><mi>U</mi>"},
{input: "(cancel((x+1))(x-2))/(cancel((x+1))(x+3))", output:"<mfrac><mrow><menclose notation=\"updiagonalstrike\"><mrow><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow></mrow></menclose><mrow><mo>(</mo><mi>x</mi><mo>−</mo><mn>2</mn><mo>)</mo></mrow></mrow><mrow><menclose notation=\"updiagonalstrike\"><mrow><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow></mrow></menclose><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mn>3</mn><mo>)</mo></mrow></mrow></mfrac>"},
{input: "a//b", output:"<mi>a</mi><mo>/</mo><mi>b</mi>"},
{input: "int_1^3 2x dx = x^2|_1^3", output:"<mrow><msubsup><mo>∫</mo><mn>1</mn><mn>3</mn></msubsup></mrow><mn>2</mn><mi>x</mi><mrow><mi>d</mi><mi>x</mi></mrow><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup><mrow><msubsup><mrow><mo>∣</mo></mrow><mn>1</mn><mn>3</mn></msubsup></mrow>"},

//from issue 15 tests
{input: "log_2(x)/5", output:"<mfrac><mrow><msub><mo>log</mo><mn>2</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mn>5</mn></mfrac>"},
{input: "log_2(x)+5", output:"<mrow><msub><mo>log</mo><mn>2</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>+</mo><mn>5</mn>"},
{input: "log_sqrt(5)3/5", output:"<mfrac><mrow><msub><mo>log</mo><msqrt><mrow><mn>5</mn></mrow></msqrt></msub><mn>3</mn></mrow><mn>5</mn></mfrac>"},
{input: "log_2^5(x)+5", output:"<mrow><mrow><msubsup><mo>log</mo><mn>2</mn><mn>5</mn></msubsup></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>+</mo><mn>5</mn>"},
{input: "2^f_2-3", output:"<msup><mn>2</mn><mi>f</mi></msup><mo>_</mo><mn>2</mn><mo>−</mo><mn>3</mn>"},
{input: "f_3(x)/5", output:"<mfrac><mrow><msub><mi>f</mi><mn>3</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mn>5</mn></mfrac>"},
{input: "2^(f_3(x)/5)", output:"<msup><mn>2</mn><mrow><mfrac><mrow><msub><mi>f</mi><mn>3</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mn>5</mn></mfrac></mrow></msup>"},
{input: "log_3x^2/5", output:"<mfrac><mrow><msub><mo>log</mo><mn>3</mn></msub><msup><mi>x</mi><mn>2</mn></msup></mrow><mn>5</mn></mfrac>"},
{input: "log_3x_0/5", output:"<mfrac><mrow><msub><mo>log</mo><mn>3</mn></msub><msub><mi>x</mi><mn>0</mn></msub></mrow><mn>5</mn></mfrac>"},
{input: "sin^2(x)/5", output:"<mfrac><mrow><msup><mo>sin</mo><mn>2</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mn>5</mn></mfrac>"},

//spaces can be used to break tokens
{input: "3+ -4", output:"<mn>3</mn><mo>+</mo><mo>−</mo><mn>4</mn>"},
{input: "3+-4", output:"<mn>3</mn><mo>±</mo><mn>4</mn>"},

//decimal place (if used as decimal separator) keeps token, but commas do not
{input: "3^5.234", output:"<msup><mn>3</mn><mn>5.234</mn></msup>"},
{input: "3^5,233", output:"<msup><mn>3</mn><mn>5</mn></msup><mo>,</mo><mn>233</mn>"},

//check I/I grammar
{input: "(x+1)/4", output:"<mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mn>4</mn></mfrac>"},
{input: "sqrtx/4", output:"<mfrac><msqrt><mi>x</mi></msqrt><mn>4</mn></mfrac>"},
{input: "root(3)(5)/4", output:"<mfrac><mroot><mrow><mn>5</mn></mrow><mrow><mn>3</mn></mrow></mroot><mn>4</mn></mfrac>"},
{input: "3^2/4^2", output:"<mfrac><msup><mn>3</mn><mn>2</mn></msup><msup><mn>4</mn><mn>2</mn></msup></mfrac>"},
{input: "3_2/4_2", output:"<mfrac><msub><mn>3</mn><mn>2</mn></msub><msub><mn>4</mn><mn>2</mn></msub></mfrac>"},
{input: "3^2/4^2", output:"<mfrac><msup><mn>3</mn><mn>2</mn></msup><msup><mn>4</mn><mn>2</mn></msup></mfrac>"},
{input: "3_2/4_2", output:"<mfrac><msub><mn>3</mn><mn>2</mn></msub><msub><mn>4</mn><mn>2</mn></msub></mfrac>"},
{input: "3_2^3/4_2", output:"<mfrac><mrow><msubsup><mn>3</mn><mn>2</mn><mn>3</mn></msubsup></mrow><msub><mn>4</mn><mn>2</mn></msub></mfrac>"},
{input: "vecx/hat3+vecx^2+(vec x)^2 + vec(x^2)", output:'<mfrac><mover accent="true"><mi>x</mi><mo stretchy="false">→</mo></mover><mover accent="true"><mn>3</mn><mo stretchy="true">̂</mo></mover></mfrac><mo>+</mo><msup><mover accent="true"><mi>x</mi><mo stretchy="false">→</mo></mover><mn>2</mn></msup><mo>+</mo><msup><mrow><mo>(</mo><mover accent="true"><mi>x</mi><mo stretchy="false">→</mo></mover><mo>)</mo></mrow><mn>2</mn></msup><mo>+</mo><mover accent="true"><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow><mo stretchy="true">→</mo></mover>'},
//negative handling
{input: "-3-4", output:"<mo>−</mo><mn>3</mn><mo>−</mo><mn>4</mn>"},
{input: "(-3,-4)", output:"<mrow><mo>(</mo><mo>−</mo><mn>3</mn><mo>,</mo><mo>−</mo><mn>4</mn><mo>)</mo></mrow>"},
{input: "-(-2-4)-5", output:"<mo>−</mo><mrow><mo>(</mo><mo>−</mo><mn>2</mn><mo>−</mo><mn>4</mn><mo>)</mo></mrow><mo>−</mo><mn>5</mn>"},
{input: "2_-4^-5", output:"<mrow><msubsup><mn>2</mn><mrow><mo>−</mo><mn>4</mn></mrow><mrow><mo>−</mo><mn>5</mn></mrow></msubsup></mrow>"},
{input: "int_-sqrt(3)^4", output:"<mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><msqrt><mrow><mn>3</mn></mrow></msqrt></mrow><mn>4</mn></msubsup></mrow>"},
{input: "-2/-3", output:"<mo>−</mo><mfrac><mn>2</mn><mrow><mo>−</mo><mn>3</mn></mrow></mfrac>"},
{input: "(-2)/-3", output:"<mfrac><mrow><mo>−</mo><mn>2</mn></mrow><mrow><mo>−</mo><mn>3</mn></mrow></mfrac>"},
{input: "-2/3-3/4", output:"<mo>−</mo><mfrac><mn>2</mn><mn>3</mn></mfrac><mo>−</mo><mfrac><mn>3</mn><mn>4</mn></mfrac>"},
{input: "-2^2", output:"<mo>−</mo><msup><mn>2</mn><mn>2</mn></msup>"},
{input: "-(x+1)/-(x+3)", output:"<mo>−</mo><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mo>−</mo><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mn>3</mn><mo>)</mo></mrow></mrow></mfrac>"},

//issue 40
{input: "{:{:x:}:}", output:"<mrow><mrow><mi>x</mi></mrow></mrow>"},
{input: "{:1+{:x:}+3:}", output:"<mrow><mn>1</mn><mo>+</mo><mrow><mi>x</mi></mrow><mo>+</mo><mn>3</mn></mrow>"},

//issue37
{input: "(:2,3]", output:"<mrow><mo>〈</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>]</mo></mrow>"},
{input: "[2,3rangle", output:"<mrow><mo>[</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>〉</mo></mrow>"},
{input: "2,3)", output:"<mn>2</mn><mo>,</mo><mn>3</mn><mo>)</mo>"},
{input: "(2,3", output:"<mrow><mo>(</mo><mn>2</mn><mo>,</mo><mn>3</mn></mrow>"},

//issue42
{input: "[(1,2,3,|,4),(5,6,7, |,8)]", output:"<mrow><mo>[</mo><mtable columnlines=\"none none solid none\"><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>8</mn></mtd></mtr></mtable><mo>]</mo></mrow>"},
{input: "[(1,2,3, | ,4,5),(5,6,7, | ,8,9)]", output:"<mrow><mo>[</mo><mtable columnlines=\"none none solid none none\"><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>8</mn></mtd><mtd><mn>9</mn></mtd></mtr></mtable><mo>]</mo></mrow>"},
{input: "[(1,|,2,3,4),(5,|,6,7,8)]", output:"<mrow><mo>[</mo><mtable columnlines=\"solid none none none\"><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>8</mn></mtd></mtr></mtable><mo>]</mo></mrow>"},
{input: "[(1,|,3,|,4),(5,|,7,|,8)]", output:"<mrow><mo>[</mo><mtable columnlines=\"solid solid none\"><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>8</mn></mtd></mtr></mtable><mo>]</mo></mrow>"},
{input: "[(2,|x|,5),(3,|y|,4)]", output:"<mrow><mo>[</mo><mtable columnlines=\"none none none\"><mtr><mtd><mn>2</mn></mtd><mtd><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mtd><mtd><mn>4</mn></mtd></mtr></mtable><mo>]</mo></mrow>"},
{input: "[(1,|,2,|x|,5),(3,|,4,|y|,7)]", output:"<mrow><mo>[</mo><mtable columnlines=\"solid none none none\"><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mtd><mtd><mn>7</mn></mtd></mtr></mtable><mo>]</mo></mrow>"},
{input: "[(1,2,3,|,4),(5,6,7,8,9)]", output:"<mrow><mo>[</mo><mtable columnlines=\"none none solid none\"><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>8</mn></mtd><mtd><mn>9</mn></mtd></mtr></mtable><mo>]</mo></mrow>"},
{input: "[(1,2,3,|,4),(5,6,7,8)]", output:"<mrow><mo>[</mo><mrow><mo>(</mo><mn>1</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mrow><mo>∣</mo></mrow><mo>,</mo><mn>4</mn><mo>)</mo></mrow><mo>,</mo><mrow><mo>(</mo><mn>5</mn><mo>,</mo><mn>6</mn><mo>,</mo><mn>7</mn><mo>,</mo><mn>8</mn><mo>)</mo></mrow><mo>]</mo></mrow>"},
{input: "[(1,2,3,4,5),(5,6,7,|,9)]", output:"<mrow><mo>[</mo><mtable columnlines=\"none none none none none\"><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>9</mn></mtd></mtr></mtable><mo>]</mo></mrow>"},
{input: "[(1,2,3,4),(5,6,7,|,9)]", output:"<mrow><mo>[</mo><mrow><mo>(</mo><mn>1</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>)</mo></mrow><mo>,</mo><mrow><mo>(</mo><mn>5</mn><mo>,</mo><mn>6</mn><mo>,</mo><mn>7</mn><mo>,</mo><mrow><mo>∣</mo></mrow><mo>,</mo><mn>9</mn><mo>)</mo></mrow><mo>]</mo></mrow>"},
{input: "[(1,2,3,|),(5,6,7,|)]", output:"<mrow><mo>[</mo><mtable columnlines=\"none none solid none\"><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>7</mn></mtd><mtd></mtd></mtr></mtable><mo>]</mo></mrow>"},
{input: "|x/2+3|,|x-4/5|", output:"<mrow><mo>|</mo><mfrac><mi>x</mi><mn>2</mn></mfrac><mo>+</mo><mn>3</mn><mo>|</mo></mrow><mo>,</mo><mrow><mo>|</mo><mi>x</mi><mo>−</mo><mfrac><mn>4</mn><mn>5</mn></mfrac><mo>|</mo></mrow>"},
{input: "int_2^4 2x dx = x^2|_2^4", output:"<mrow><msubsup><mo>∫</mo><mn>2</mn><mn>4</mn></msubsup></mrow><mn>2</mn><mi>x</mi><mrow><mi>d</mi><mi>x</mi></mrow><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup><mrow><msubsup><mrow><mo>∣</mo></mrow><mn>2</mn><mn>4</mn></msubsup></mrow>"},

//issue74
{input: "3+sin(x)/5-2Sin(x)", output:"<mn>3</mn><mo>+</mo><mfrac><mrow><mo>sin</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mn>5</mn></mfrac><mo>−</mo><mn>2</mn><mrow><mo>Sin</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>"},
{input: "5+sin(x)+Sin(x)+\"test Since\"", output:"<mn>5</mn><mo>+</mo><mrow><mo>sin</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>+</mo><mrow><mo>Sin</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>+</mo><mrow><mtext>test Since</mtext></mrow>"},
{input: "Log(x)/3 +log(x)/3", output:"<mfrac><mrow><mo>Log</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mn>3</mn></mfrac><mo>+</mo><mfrac><mrow><mo>log</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mn>3</mn></mfrac>"},
{input: "Abs(3) + abs(3)", output:"<mrow><mo>|</mo><mrow><mn>3</mn></mrow><mo>|</mo></mrow><mo>+</mo><mrow><mo>|</mo><mrow><mn>3</mn></mrow><mo>|</mo></mrow>"},

//issue86
{input: "3 + id(hi)(x^2)+class(red)(4)", output:"<mn>3</mn><mo>+</mo><mrow id=\"hi\"><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow></mrow><mo>+</mo><mrow class=\"red\"><mrow><mn>4</mn></mrow></mrow>"},

//issue 94
{input: "f^2(x)/5", output:"<mfrac><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mn>5</mn></mfrac>"},
{input: "f^2x/5", output:"<msup><mi>f</mi><mn>2</mn></msup><mfrac><mi>x</mi><mn>5</mn></mfrac>"},
{input: "1/f^2x^2", output:"<mfrac><mn>1</mn><msup><mi>f</mi><mn>2</mn></msup></mfrac><msup><mi>x</mi><mn>2</mn></msup>"},
{input: "1/fx^2", output:"<mfrac><mn>1</mn><mi>f</mi></mfrac><msup><mi>x</mi><mn>2</mn></msup>"},
{input: "f'(x)/5", output:"<mi>f</mi><mo>′</mo><mfrac><mrow><mi>x</mi></mrow><mn>5</mn></mfrac>"},

// issue 113
{input: "[[1,2]]/4", output:"<mfrac><mrow><mo>[</mo><mtable columnlines=\"none none\"><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable><mo>]</mo></mrow><mn>4</mn></mfrac>"},
{input: "(x+2)/3", output:"<mfrac><mrow><mi>x</mi><mo>+</mo><mn>2</mn></mrow><mn>3</mn></mfrac>"},

// issue 114
{input: "u_-3 + u_- 3", output:"<msub><mi>u</mi><mrow><mo>−</mo><mn>3</mn></mrow></msub><mo>+</mo><msub><mi>u</mi><mo>−</mo></msub><mn>3</mn>"},
{input: "2^- +3", output:"<msup><mn>2</mn><mo>−</mo></msup><mo>+</mo><mn>3</mn>"},

// issue 133
{input: "!-=", output:"<mo>≢</mo>"},
{input: "\\not\\equiv", output:"<mo>≢</mo>"},
{input: "notequiv", output:"<mo>≢</mo>"},

// issue 136
{input: "!sup", output:"<mo>⊅</mo>"}, // normal entry
{input: "!sub", output:"<mo>⊄</mo>"},
{input: "!sube", output:"<mo>⊈</mo>"},
{input: "!supe", output:"<mo>⊉</mo>"},
{input: "\\not\\subset", output:"<mo>⊄</mo>"}, // latex style
{input: "notsubset", output:"<mo>⊄</mo>"}, // semi-latex style

//add_misc_symbols 
{input: "o-", output:"<mo>⊖</mo>"},
{input: "ominus", output:"<mo>⊖</mo>"},
{input: "arcsec", output:"<mrow><mo>arcsec</mo><mo></mo></mrow>"},
{input: "arccot", output:"<mrow><mo>arccot</mo><mo></mo></mrow>"},
{input: "arccsc", output:"<mrow><mo>arccsc</mo><mo></mo></mrow>"},
{input: "rightleftharpoons", output:"<mo>⇌</mo>"},
{input: "hbar", output:"<mo>ℏ</mo>"},

// sim
{input: "3~2,5sim4", output:"<mn>3</mn><mo>∼</mo><mn>2</mn><mo>,</mo><mn>5</mn><mo>∼</mo><mn>4</mn>"},
//overparen
{input: "overparen(AB)", output:'<mover accent="true"><mrow><mi>A</mi><mi>B</mi></mrow><mo stretchy="true">⏜</mo></mover>'},
{input: "overarc(AB)", output:'<mover accent="true"><mrow><mi>A</mi><mi>B</mi></mrow><mo stretchy="true">⏜</mo></mover>'},

//mp
{input: "(x-+5)(xmp5)", output:"<mrow><mo>(</mo><mi>x</mi><mo>∓</mo><mn>5</mn><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>∓</mo><mn>5</mn><mo>)</mo></mrow>"},

//bad/incomplete input
{input: "3/", output:"<mfrac><mn>3</mn><mo></mo></mfrac>"},
{input: "2^", output:"<msup><mn>2</mn><mo></mo></msup>"},
{input: "2^+3", output:"<msup><mn>2</mn><mo>+</mo></msup><mn>3</mn>"},
{input: "/4", output:"<mo>/</mo><mn>4</mn>"},
{input: "lim_(x rarr 2^-) f(x)", output:"<munder><mo>lim</mo><mrow><mi>x</mi><mo>→</mo><msup><mn>2</mn><mo>−</mo></msup></mrow></munder><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>"},
];

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

$(function() {
	setTimeout(runTests, 100);
	//setTimeout(generateSymbolTests, 100);
});
function runTests() {
	$("#maketest").on('click', function() {
		var txt = $("#newtest").val();
		var out = $(asciimath.parseMath(txt)).find("mstyle").html().replace(/\\/g,"\\\\").replace(/"/g,'\\"');;
		var outstr = '{input: "'+txt.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'", output:"'+out+'"},\n';
		$("#newtestout").text($("#newtestout").text()+outstr);		
	})
	var res,tr,td;
	var tbody = document.getElementById("testout");
	for (var i=0;i<unittests.length;i++) {
		res = asciimath.parseMath(unittests[i].input);
		tr = document.createElement("tr");
		
		td = document.createElement("td");
		td.appendChild(document.createTextNode(unittests[i].input));
		tr.appendChild(td);
		
		td = document.createElement("td");
		td.appendChild(res);
		tr.appendChild(td);
		var outhtml = $(res).find("mstyle").html();
		
		td = document.createElement("td");
		code = document.createElement("code");
		code.appendChild(document.createTextNode(outhtml));
		td.appendChild(code);
		tr.appendChild(td);
		
		td = document.createElement("td");
		code = document.createElement("code");
		code.appendChild(document.createTextNode(unittests[i].output));
		td.appendChild(code);
		tr.appendChild(td);
		
		if (unittests[i].output == outhtml) {
			tr.className = "success";
		} else {
			tr.className = "failed";
		}
		tbody.appendChild(tr);
	}
};

function generateSymbolTests() {
	var outhtml, res, outstr;
	for (var i=0; i<asciimath.AMnames.length;i++) {
		res = asciimath.parseMath(asciimath.AMnames[i]);
		outhtml = $(res).find("mstyle").html().replace(/\\/g,"\\\\").replace(/"/g,'\\"');
		outstr += '{input: "'+asciimath.AMnames[i].replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'", output:"'+outhtml+'"},\n';
	}
	$("#newtestout").text(outstr);	
}
