// Riddle bank. One riddle per day, in this order, starting on START_DATE.
// To add more, append new objects at the end (never reorder: past days would change).
// diff: 1 = easy, 2 = medium, 3 = hard
const START_DATE = "2026-11-17";

const RIDDLES = [
{
  diff: 2,
  en: {
    title: "Three switches",
    q: "There are three light switches downstairs. One of them controls a light bulb in the attic; the other two do nothing. The attic door is closed, so you can't see the bulb from downstairs.\n\nYou can flip the switches as much as you like, but you may go up to the attic only once. How do you find out which switch controls the bulb?",
    hint: "A light bulb gives off more than just light.",
    a: "Turn switch 1 on and leave it on for about 10 minutes. Then turn it off, turn switch 2 on, and go upstairs.\n\n• Bulb on → switch 2.\n• Bulb off but warm → switch 1.\n• Bulb off and cold → switch 3."
  },
  pt: {
    title: "Três interruptores",
    q: "No rés-do-chão há três interruptores. Um deles acende uma lâmpada no sótão; os outros dois não fazem nada. A porta do sótão está fechada, por isso não vês a lâmpada lá de baixo.\n\nPodes mexer nos interruptores à vontade, mas só podes subir ao sótão uma vez. Como descobres qual é o interruptor da lâmpada?",
    hint: "Uma lâmpada não dá só luz.",
    a: "Liga o interruptor 1 e deixa-o ligado uns 10 minutos. Depois desliga-o, liga o interruptor 2 e sobe.\n\n• Lâmpada acesa → interruptor 2.\n• Apagada mas quente → interruptor 1.\n• Apagada e fria → interruptor 3."
  }
},
{
  diff: 2,
  en: {
    title: "Burning ropes",
    q: "You have two ropes and a lighter. Each rope takes exactly 60 minutes to burn completely, but they burn unevenly: half the rope does not necessarily take 30 minutes.\n\nHow do you measure exactly 45 minutes?",
    hint: "What happens if you light a rope at both ends at the same time?",
    a: "Light rope A at both ends and rope B at one end, all at the same time.\n\nRope A burns out after exactly 30 minutes (two flames, however uneven). At that moment rope B has 30 minutes left, so light its other end too: it burns out after 15 more minutes.\n\n30 + 15 = 45 minutes."
  },
  pt: {
    title: "Cordas a arder",
    q: "Tens duas cordas e um isqueiro. Cada corda demora exatamente 60 minutos a arder por completo, mas ardem de forma irregular: metade da corda não demora necessariamente 30 minutos.\n\nComo medes exatamente 45 minutos?",
    hint: "O que acontece se acenderes uma corda pelas duas pontas ao mesmo tempo?",
    a: "Acende a corda A pelas duas pontas e a corda B por uma ponta, tudo ao mesmo tempo.\n\nA corda A acaba ao fim de exatamente 30 minutos (duas chamas, por mais irregular que seja). Nesse momento faltam 30 minutos à corda B, por isso acende-lhe também a outra ponta: acaba 15 minutos depois.\n\n30 + 15 = 45 minutos."
  }
},
{
  diff: 1,
  en: {
    title: "Bat and ball",
    q: "A bat and a ball cost €1.10 in total. The bat costs €1.00 more than the ball.\n\nHow much does the ball cost?",
    hint: "It's not 10 cents. Check: if the ball cost 10 cents, what would the bat cost?",
    a: "5 cents.\n\nBall = x, bat = x + 1.00. So x + (x + 1.00) = 1.10 → 2x = 0.10 → x = 0.05.\n\nThe ball costs €0.05 and the bat €1.05."
  },
  pt: {
    title: "Taco e bola",
    q: "Um taco e uma bola custam 1,10 € no total. O taco custa mais 1,00 € do que a bola.\n\nQuanto custa a bola?",
    hint: "Não são 10 cêntimos. Verifica: se a bola custasse 10 cêntimos, quanto custaria o taco?",
    a: "5 cêntimos.\n\nBola = x, taco = x + 1,00. Então x + (x + 1,00) = 1,10 → 2x = 0,10 → x = 0,05.\n\nA bola custa 0,05 € e o taco 1,05 €."
  }
},
{
  diff: 2,
  en: {
    title: "Two jugs",
    q: "You have a 3-litre jug, a 5-litre jug and an unlimited tap. The jugs have no markings.\n\nHow do you get exactly 4 litres of water?",
    hint: "Filling the 5 L jug and pouring it into the 3 L jug leaves you with something useful.",
    a: "1. Fill the 5 L jug.\n2. Pour it into the 3 L jug until full → 2 L left in the 5 L jug.\n3. Empty the 3 L jug and pour the 2 L into it.\n4. Fill the 5 L jug again.\n5. Top up the 3 L jug (it only takes 1 L).\n\nThe 5 L jug now holds exactly 4 L."
  },
  pt: {
    title: "Dois jarros",
    q: "Tens um jarro de 3 litros, um de 5 litros e uma torneira com água ilimitada. Os jarros não têm marcas.\n\nComo obténs exatamente 4 litros de água?",
    hint: "Encher o jarro de 5 L e despejá-lo no de 3 L deixa-te com algo útil.",
    a: "1. Enche o jarro de 5 L.\n2. Despeja-o no de 3 L até encher → ficam 2 L no de 5 L.\n3. Esvazia o de 3 L e põe lá os 2 L.\n4. Enche outra vez o de 5 L.\n5. Completa o de 3 L (só leva 1 L).\n\nO jarro de 5 L fica com exatamente 4 L."
  }
},
{
  diff: 2,
  en: {
    title: "Knights and knaves",
    q: "On an island, knights always tell the truth and knaves always lie. You meet two islanders, A and B.\n\nA says: \"We are both knaves.\"\n\nWhat are A and B?",
    hint: "Could a knight ever say that sentence?",
    a: "A is a knave and B is a knight.\n\nIf A were a knight, the sentence would be true, so A would be a knave: a contradiction. So A is a knave, and the sentence is false. That means they are not both knaves, so B must be a knight."
  },
  pt: {
    title: "Cavaleiros e mentirosos",
    q: "Numa ilha, os cavaleiros dizem sempre a verdade e os mentirosos mentem sempre. Encontras dois habitantes, A e B.\n\nA diz: \"Somos os dois mentirosos.\"\n\nO que são A e B?",
    hint: "Um cavaleiro alguma vez poderia dizer essa frase?",
    a: "A é mentiroso e B é cavaleiro.\n\nSe A fosse cavaleiro, a frase seria verdadeira, logo A seria mentiroso: contradição. Portanto A é mentiroso e a frase é falsa. Ou seja, não são os dois mentirosos, logo B é cavaleiro."
  }
},
{
  diff: 3,
  en: {
    title: "The night bridge",
    q: "Four people need to cross a narrow bridge at night. They have one torch, and the bridge holds at most two people at a time. Anyone crossing must carry the torch (so it has to be brought back each time).\n\nThey walk at different speeds: 1, 2, 5 and 10 minutes. A pair walks at the slower person's pace.\n\nCan they all cross in 17 minutes?",
    hint: "The two slowest people should cross together.",
    a: "Yes:\n\n1. 1 and 2 cross → 2 min\n2. 1 returns → 1 min\n3. 5 and 10 cross → 10 min\n4. 2 returns → 2 min\n5. 1 and 2 cross → 2 min\n\nTotal: 2 + 1 + 10 + 2 + 2 = 17 minutes."
  },
  pt: {
    title: "A ponte à noite",
    q: "Quatro pessoas têm de atravessar uma ponte estreita à noite. Têm uma lanterna e a ponte aguenta no máximo duas pessoas de cada vez. Quem atravessa tem de levar a lanterna (por isso alguém tem de a trazer de volta).\n\nDemoram 1, 2, 5 e 10 minutos. Um par anda ao ritmo do mais lento.\n\nConseguem atravessar todos em 17 minutos?",
    hint: "Os dois mais lentos devem atravessar juntos.",
    a: "Sim:\n\n1. 1 e 2 atravessam → 2 min\n2. 1 volta → 1 min\n3. 5 e 10 atravessam → 10 min\n4. 2 volta → 2 min\n5. 1 e 2 atravessam → 2 min\n\nTotal: 2 + 1 + 10 + 2 + 2 = 17 minutos."
  }
},
{
  diff: 3,
  en: {
    title: "Twelve islanders",
    q: "There are 12 people on an island. One of them weighs differently from the rest (heavier or lighter, you don't know which); the other 11 all weigh the same.\n\nYou have a two-pan balance. You can put as many people as you like on each side, and it only tells you which side is heavier (no numbers). You may use it 3 times.\n\nHow do you find the person with the different weight?",
    hint: "Start with 4 vs 4. If it tips, the second weighing should move some people across, swap others out, and bring in people you already know are normal.",
    a: "Number them 1–12.\n\nWeighing 1: 1 2 3 4 vs 5 6 7 8.\n\nIF BALANCED → the odd one is among 9–12 (1–8 are normal).\nWeighing 2: 9 10 11 vs 1 2 3.\n• Balanced → it's 12.\n• 9 10 11 heavier → one of them is heavy. Weighing 3: 9 vs 10. The heavier one is it; if balanced, it's 11.\n• 9 10 11 lighter → same idea, looking for the lighter one.\n\nIF 1 2 3 4 IS HEAVIER → either one of 1–4 is heavy, or one of 5–8 is light.\nWeighing 2: 1 2 5 vs 3 6 9 (9 is known to be normal).\n• Balanced → 4 heavy, or 7 or 8 light. Weighing 3: 7 vs 8. The lighter one is it; if balanced, it's 4.\n• Left heavier → 1 or 2 heavy, or 6 light. Weighing 3: 1 vs 2. The heavier one is it; if balanced, it's 6.\n• Right heavier → 3 heavy or 5 light. Weighing 3: 3 vs 9. If 3 is heavier it's 3; if balanced, it's 5.\n\nIF 1 2 3 4 IS LIGHTER → same as above with heavy and light swapped."
  },
  pt: {
    title: "Doze pessoas na ilha",
    q: "Numa ilha estão 12 pessoas. Uma delas tem um peso diferente das restantes (pode pesar mais ou menos, não sabes); as outras 11 pesam todas o mesmo.\n\nTens uma balança de dois pratos onde podes pôr quantas pessoas quiseres de cada lado, e que só te diz qual o lado mais pesado (sem valores). Podes usá-la 3 vezes.\n\nComo descobres a pessoa com peso diferente?",
    hint: "Começa com 4 contra 4. Se desequilibrar, na segunda pesagem troca algumas pessoas de lado, tira outras e junta pessoas que já sabes que são normais.",
    a: "Numera-as de 1 a 12.\n\nPesagem 1: 1 2 3 4 contra 5 6 7 8.\n\nSE EQUILIBRAR → a diferente está entre 9 e 12 (1–8 são normais).\nPesagem 2: 9 10 11 contra 1 2 3.\n• Equilibra → é a 12.\n• 9 10 11 mais pesado → uma delas pesa mais. Pesagem 3: 9 contra 10. A mais pesada é a diferente; se equilibrar, é a 11.\n• 9 10 11 mais leve → igual, à procura da mais leve.\n\nSE 1 2 3 4 FOR MAIS PESADO → ou uma de 1–4 pesa mais, ou uma de 5–8 pesa menos.\nPesagem 2: 1 2 5 contra 3 6 9 (a 9 é normal).\n• Equilibra → 4 pesada, ou 7 ou 8 leve. Pesagem 3: 7 contra 8. A mais leve é a diferente; se equilibrar, é a 4.\n• Esquerda mais pesada → 1 ou 2 pesada, ou 6 leve. Pesagem 3: 1 contra 2. A mais pesada é a diferente; se equilibrar, é a 6.\n• Direita mais pesada → 3 pesada ou 5 leve. Pesagem 3: 3 contra 9. Se a 3 pesar mais, é a 3; se equilibrar, é a 5.\n\nSE 1 2 3 4 FOR MAIS LEVE → igual ao anterior, trocando pesado e leve."
  }
},
{
  diff: 1,
  en: {
    title: "Lily pads",
    q: "A patch of lily pads in a lake doubles in size every day. It takes 48 days for the patch to cover the whole lake.\n\nHow many days does it take to cover half the lake?",
    hint: "Think backwards from day 48.",
    a: "47 days.\n\nIt doubles every day, so the day before it covers the whole lake, it covers exactly half."
  },
  pt: {
    title: "Nenúfares",
    q: "Uma mancha de nenúfares num lago duplica de tamanho todos os dias. Demora 48 dias a cobrir o lago inteiro.\n\nQuantos dias demora a cobrir metade do lago?",
    hint: "Pensa para trás a partir do dia 48.",
    a: "47 dias.\n\nDuplica todos os dias, por isso no dia antes de cobrir o lago todo cobre exatamente metade."
  }
},
{
  diff: 1,
  en: {
    title: "Wolf, goat and cabbage",
    q: "A farmer must take a wolf, a goat and a cabbage across a river. His boat can carry him and only one of them at a time.\n\nIf left alone together, the wolf eats the goat, and the goat eats the cabbage.\n\nHow does he get everything across?",
    hint: "Nothing says he can't bring something back.",
    a: "1. Take the goat across.\n2. Go back alone.\n3. Take the wolf across.\n4. Bring the goat back.\n5. Take the cabbage across.\n6. Go back alone.\n7. Take the goat across.\n\nThe wolf and the cabbage are never a problem together."
  },
  pt: {
    title: "Lobo, cabra e couve",
    q: "Um agricultor tem de levar um lobo, uma cabra e uma couve para o outro lado do rio. O barco só leva ele e mais uma coisa de cada vez.\n\nSe ficarem sozinhos, o lobo come a cabra e a cabra come a couve.\n\nComo é que ele leva tudo?",
    hint: "Nada diz que ele não pode trazer algo de volta.",
    a: "1. Leva a cabra.\n2. Volta sozinho.\n3. Leva o lobo.\n4. Traz a cabra de volta.\n5. Leva a couve.\n6. Volta sozinho.\n7. Leva a cabra.\n\nO lobo e a couve nunca são problema juntos."
  }
},
{
  diff: 2,
  en: {
    title: "Two doors, two guards",
    q: "You are in front of two doors: one leads to freedom, the other to a dungeon. Each door has a guard. One guard always tells the truth, the other always lies, and you don't know which is which.\n\nYou may ask one guard one yes-or-no or simple question. What do you ask?",
    hint: "Make the liar's lie and the truth-teller's truth end up pointing to the same door.",
    a: "Ask either guard: \"Which door would the other guard say leads to freedom?\" Then take the other door.\n\n• Ask the truth-teller: he truthfully reports the liar's answer, which is the wrong door.\n• Ask the liar: he lies about the truth-teller's answer, so he also points to the wrong door.\n\nEither way you get the wrong door, so pick the opposite one."
  },
  pt: {
    title: "Duas portas, dois guardas",
    q: "Estás à frente de duas portas: uma leva à liberdade, a outra a uma masmorra. Cada porta tem um guarda. Um diz sempre a verdade, o outro mente sempre, e não sabes qual é qual.\n\nPodes fazer uma única pergunta a um dos guardas. O que perguntas?",
    hint: "Faz com que a mentira de um e a verdade do outro acabem a apontar para a mesma porta.",
    a: "Pergunta a qualquer um: \"Que porta é que o outro guarda diria que leva à liberdade?\" E escolhe a outra porta.\n\n• Se perguntares ao que diz a verdade: ele repete fielmente a resposta do mentiroso, que é a porta errada.\n• Se perguntares ao mentiroso: ele mente sobre a resposta do outro, por isso também aponta a porta errada.\n\nEm ambos os casos recebes a porta errada, por isso escolhes a oposta."
  }
},
{
  diff: 2,
  en: {
    title: "The portrait",
    q: "A man is looking at a portrait. Someone asks whose picture it is. He answers:\n\n\"Brothers and sisters I have none, but that man's father is my father's son.\"\n\nWho is in the portrait?",
    hint: "With no siblings, who is \"my father's son\"?",
    a: "His son.\n\nHe has no brothers, so \"my father's son\" is himself. The sentence becomes \"that man's father is me\", so the man in the portrait is his son."
  },
  pt: {
    title: "O retrato",
    q: "Um homem está a olhar para um retrato. Perguntam-lhe de quem é. Ele responde:\n\n\"Irmãos e irmãs não tenho nenhum, mas o pai daquele homem é o filho do meu pai.\"\n\nQuem está no retrato?",
    hint: "Sem irmãos, quem é \"o filho do meu pai\"?",
    a: "O filho dele.\n\nNão tem irmãos, por isso \"o filho do meu pai\" é ele próprio. A frase fica \"o pai daquele homem sou eu\", logo o homem do retrato é o filho dele."
  }
},
{
  diff: 1,
  en: {
    title: "Snail in a well",
    q: "A snail is at the bottom of a 30-metre well. Every day it climbs 3 metres, and every night it slides back 2 metres.\n\nOn which day does it get out?",
    hint: "It's not day 30. Watch what happens on the last day.",
    a: "On day 28.\n\nIt gains 1 metre per full day and night, so after 27 days it is at 27 metres. On day 28 it climbs 3 metres, reaches 30 and is out before it can slide back."
  },
  pt: {
    title: "Caracol no poço",
    q: "Um caracol está no fundo de um poço com 30 metros. Todos os dias sobe 3 metros e todas as noites escorrega 2 metros.\n\nEm que dia sai do poço?",
    hint: "Não é no dia 30. Repara no que acontece no último dia.",
    a: "No dia 28.\n\nGanha 1 metro por cada dia e noite completos, por isso ao fim de 27 dias está nos 27 metros. No dia 28 sobe 3 metros, chega aos 30 e sai antes de poder escorregar."
  }
},
{
  diff: 2,
  en: {
    title: "100 doors",
    q: "A corridor has 100 closed doors, numbered 1 to 100. You walk past 100 times.\n\nOn pass 1 you toggle every door (open it if closed, close it if open). On pass 2 you toggle every 2nd door (2, 4, 6…). On pass 3 every 3rd door, and so on, until pass 100, where you toggle only door 100.\n\nHow many doors are open at the end?",
    hint: "Door n is toggled once for each divisor of n. Which numbers have an odd number of divisors?",
    a: "10 doors are open: 1, 4, 9, 16, 25, 36, 49, 64, 81 and 100.\n\nA door ends open if it was toggled an odd number of times, which means its number has an odd number of divisors. Divisors come in pairs (2 × 6 = 12) except when a number is a perfect square (6 × 6 = 36), so only perfect squares have an odd number of divisors."
  },
  pt: {
    title: "100 portas",
    q: "Um corredor tem 100 portas fechadas, numeradas de 1 a 100. Passas por lá 100 vezes.\n\nNa passagem 1 mudas todas as portas (abres se está fechada, fechas se está aberta). Na passagem 2 mudas uma em cada 2 (2, 4, 6…). Na 3 uma em cada 3, e assim por diante, até à passagem 100, em que só mudas a porta 100.\n\nQuantas portas ficam abertas no fim?",
    hint: "A porta n é mudada uma vez por cada divisor de n. Que números têm um número ímpar de divisores?",
    a: "Ficam 10 abertas: 1, 4, 9, 16, 25, 36, 49, 64, 81 e 100.\n\nUma porta fica aberta se foi mudada um número ímpar de vezes, ou seja, se o seu número tem um número ímpar de divisores. Os divisores vêm aos pares (2 × 6 = 12), exceto nos quadrados perfeitos (6 × 6 = 36), por isso só os quadrados perfeitos têm um número ímpar de divisores."
  }
},
{
  diff: 3,
  en: {
    title: "The poisoned bottle",
    q: "A king has 1,000 bottles of wine. Exactly one is poisoned. The poison is slow: anyone who drinks even a drop will fall ill exactly 24 hours later, and not before.\n\nThe party is in 24 hours. What is the smallest number of tasters needed to find the poisoned bottle in time?",
    hint: "Each taster either gets ill or doesn't: that's one bit of information.",
    a: "10 tasters.\n\nNumber the bottles 1 to 1,000 and write each number in binary (10 digits, since 2¹⁰ = 1,024). Taster k drinks a drop from every bottle whose k-th binary digit is 1.\n\nAfter 24 hours, write 1 for each taster who is ill and 0 for each who isn't. That 10-digit binary number is the poisoned bottle."
  },
  pt: {
    title: "A garrafa envenenada",
    q: "Um rei tem 1000 garrafas de vinho. Exatamente uma está envenenada. O veneno é lento: quem beber nem que seja uma gota fica doente exatamente 24 horas depois, e não antes.\n\nA festa é daqui a 24 horas. Qual é o menor número de provadores necessário para descobrir a garrafa a tempo?",
    hint: "Cada provador fica doente ou não: é um bit de informação.",
    a: "10 provadores.\n\nNumera as garrafas de 1 a 1000 e escreve cada número em binário (10 dígitos, já que 2¹⁰ = 1024). O provador k bebe uma gota de cada garrafa cujo k-ésimo dígito binário é 1.\n\nPassadas 24 horas, escreve 1 por cada provador doente e 0 por cada um que não está. Esse número binário de 10 dígitos é a garrafa envenenada."
  }
},
{
  diff: 3,
  en: {
    title: "How old are we?",
    q: "I am twice as old as you were when I was as old as you are now. Our ages add up to 63.\n\nHow old are we?",
    hint: "Call my age x and your age y. The age gap x − y never changes.",
    a: "I am 36 and you are 27.\n\nThe gap is x − y. When I was y (your age now), that was x − y years ago, and you were y − (x − y) = 2y − x. So x = 2(2y − x) → 3x = 4y. With x + y = 63: x = 36, y = 27.\n\nCheck: when I was 27, you were 18, and 36 = 2 × 18. ✓"
  },
  pt: {
    title: "Que idade temos?",
    q: "Eu tenho o dobro da idade que tu tinhas quando eu tinha a idade que tu tens agora. As nossas idades somam 63.\n\nQue idade temos?",
    hint: "Chama x à minha idade e y à tua. A diferença x − y nunca muda.",
    a: "Eu tenho 36 e tu tens 27.\n\nA diferença é x − y. Quando eu tinha y (a tua idade agora), foi há x − y anos, e tu tinhas y − (x − y) = 2y − x. Então x = 2(2y − x) → 3x = 4y. Com x + y = 63: x = 36, y = 27.\n\nVerificação: quando eu tinha 27, tu tinhas 18, e 36 = 2 × 18. ✓"
  }
},
{
  diff: 2,
  en: {
    title: "Two hourglasses",
    q: "You have a 7-minute hourglass and an 11-minute hourglass.\n\nHow do you measure exactly 15 minutes?",
    hint: "Start both at once, and pay attention to how much sand has fallen in the 7-minute one when the 11-minute one runs out.",
    a: "1. Start both at the same time.\n2. At 7 minutes the small one runs out: flip it.\n3. At 11 minutes the big one runs out. The small one has been running for 4 minutes: flip it again.\n4. Those 4 minutes of sand run back down, ending at 11 + 4 = 15 minutes."
  },
  pt: {
    title: "Duas ampulhetas",
    q: "Tens uma ampulheta de 7 minutos e outra de 11 minutos.\n\nComo medes exatamente 15 minutos?",
    hint: "Começa as duas ao mesmo tempo e repara em quanta areia já caiu na de 7 quando a de 11 acaba.",
    a: "1. Começa as duas ao mesmo tempo.\n2. Aos 7 minutos a pequena acaba: vira-a.\n3. Aos 11 minutos a grande acaba. A pequena está a correr há 4 minutos: vira-a outra vez.\n4. Esses 4 minutos de areia voltam a cair, acabando aos 11 + 4 = 15 minutos."
  }
},
{
  diff: 2,
  en: {
    title: "The missing euro",
    q: "Three friends pay €30 for a hotel room, €10 each. Later the manager realises the room costs only €25 and gives the porter €5 to return. The porter can't split €5 three ways, so he keeps €2 and gives each friend €1 back.\n\nNow each friend has paid €9: 3 × 9 = 27. Plus the €2 the porter kept makes 29.\n\nWhere is the missing euro?",
    hint: "Should the porter's €2 be added to the 27, or is it already inside it?",
    a: "There is no missing euro: the sum is wrong.\n\nThe €27 the friends paid already includes the porter's €2 (€25 for the room + €2 for the porter). Adding the 2 again counts it twice.\n\nThe correct sum is €25 (hotel) + €2 (porter) + €3 (returned) = €30."
  },
  pt: {
    title: "O euro desaparecido",
    q: "Três amigos pagam 30 € por um quarto de hotel, 10 € cada. Mais tarde o gerente percebe que o quarto só custa 25 € e dá 5 € ao paquete para devolver. O paquete não consegue dividir 5 € por três, por isso fica com 2 € e devolve 1 € a cada um.\n\nAgora cada amigo pagou 9 €: 3 × 9 = 27. Mais os 2 € do paquete dá 29.\n\nOnde está o euro que falta?",
    hint: "Os 2 € do paquete devem ser somados aos 27, ou já estão lá dentro?",
    a: "Não falta euro nenhum: a conta é que está errada.\n\nOs 27 € que os amigos pagaram já incluem os 2 € do paquete (25 € do quarto + 2 € do paquete). Somar os 2 outra vez conta-os duas vezes.\n\nA conta certa é 25 € (hotel) + 2 € (paquete) + 3 € (devolvidos) = 30 €."
  }
},
{
  diff: 2,
  en: {
    title: "The cut chessboard",
    q: "You cut two opposite corner squares off a standard 8 × 8 chessboard, leaving 62 squares.\n\nYou have 31 dominoes, each covering exactly two adjacent squares. Can you cover the board with them?",
    hint: "Look at the colours of the two squares you removed.",
    a: "No.\n\nOpposite corners are the same colour, so the board now has 32 squares of one colour and 30 of the other. Every domino covers one black and one white square, so 31 dominoes would need 31 of each. Impossible."
  },
  pt: {
    title: "O tabuleiro cortado",
    q: "Cortas duas casas de cantos opostos a um tabuleiro de xadrez 8 × 8, ficando com 62 casas.\n\nTens 31 dominós e cada um cobre exatamente duas casas adjacentes. Consegues cobrir o tabuleiro?",
    hint: "Olha para a cor das duas casas que tiraste.",
    a: "Não.\n\nOs cantos opostos são da mesma cor, por isso o tabuleiro fica com 32 casas de uma cor e 30 da outra. Cada dominó cobre uma casa preta e uma branca, por isso 31 dominós precisariam de 31 de cada. Impossível."
  }
},
{
  diff: 1,
  en: {
    title: "Two trains and a bird",
    q: "Two trains are 100 km apart on the same track, heading towards each other at 50 km/h each. A bird starts at the front of one train and flies at 75 km/h to the other, turns around instantly, flies back, and keeps doing this until the trains meet.\n\nHow far does the bird fly in total?",
    hint: "Don't add up the trips. How long does the bird fly?",
    a: "75 km.\n\nThe trains close the gap at 100 km/h, so they meet after 1 hour. The bird flies at 75 km/h for that hour."
  },
  pt: {
    title: "Dois comboios e um pássaro",
    q: "Dois comboios estão a 100 km um do outro na mesma linha, em sentidos opostos, a 50 km/h cada. Um pássaro parte da frente de um deles a 75 km/h até ao outro, vira instantaneamente, volta, e repete até os comboios se encontrarem.\n\nQuantos quilómetros voa o pássaro no total?",
    hint: "Não somes as viagens. Durante quanto tempo voa o pássaro?",
    a: "75 km.\n\nOs comboios aproximam-se a 100 km/h, por isso encontram-se ao fim de 1 hora. O pássaro voa a 75 km/h durante essa hora."
  }
},
{
  diff: 2,
  en: {
    title: "The fake coins",
    q: "You have 10 bags of coins. Real coins weigh 10 g each. One whole bag is fake: its coins weigh 9 g each.\n\nYou have a digital scale that shows the exact weight, and you may use it only once. How do you find the fake bag?",
    hint: "Take a different number of coins from each bag.",
    a: "Take 1 coin from bag 1, 2 from bag 2, … 10 from bag 10: 55 coins in total. Weigh them all.\n\nIf all were real it would be 550 g. Each fake coin is 1 g lighter, so the number of grams missing is the number of the fake bag. For example, 543 g → 7 g short → bag 7."
  },
  pt: {
    title: "As moedas falsas",
    q: "Tens 10 sacos de moedas. As moedas verdadeiras pesam 10 g cada. Um saco inteiro é falso: as moedas pesam 9 g cada.\n\nTens uma balança digital que mostra o peso exato e só a podes usar uma vez. Como descobres o saco falso?",
    hint: "Tira um número diferente de moedas de cada saco.",
    a: "Tira 1 moeda do saco 1, 2 do saco 2, … 10 do saco 10: 55 moedas no total. Pesa-as todas.\n\nSe fossem todas verdadeiras daria 550 g. Cada moeda falsa pesa menos 1 g, por isso os gramas em falta são o número do saco falso. Por exemplo, 543 g → faltam 7 g → saco 7."
  }
},
{
  diff: 3,
  en: {
    title: "Hats in a line",
    q: "100 prisoners stand in a line, all facing forward. Each wears a black or white hat. Everyone can see the hats of all the people in front of them, but not their own or those behind.\n\nStarting from the back, each prisoner says one word: \"black\" or \"white\". Those who name their own hat colour go free. Everyone hears every answer.\n\nThey can agree on a strategy beforehand. How many can they guarantee to save?",
    hint: "The person at the back can't be helped, but their one word can carry information for everyone else. Think odd or even.",
    a: "99 are guaranteed to be saved (the last person has a 50% chance).\n\nStrategy: the person at the back says \"black\" if they see an odd number of black hats in front of them, and \"white\" if it's even.\n\nThe next person counts the black hats they can see. If the parity has changed, their own hat is black; otherwise it's white. Everyone after that keeps track of the answers they hear and does the same, so each of them can work out their own colour."
  },
  pt: {
    title: "Chapéus em fila",
    q: "100 prisioneiros estão em fila, todos virados para a frente. Cada um tem um chapéu preto ou branco. Cada um vê os chapéus de todos os que estão à sua frente, mas não o seu nem os de trás.\n\nA começar pelo último, cada um diz uma palavra: \"preto\" ou \"branco\". Quem acertar na cor do seu chapéu é libertado. Todos ouvem todas as respostas.\n\nPodem combinar uma estratégia antes. Quantos conseguem garantir que se salvam?",
    hint: "O último não pode ser ajudado, mas a sua palavra pode levar informação para todos os outros. Pensa em par ou ímpar.",
    a: "99 salvam-se garantidamente (o último tem 50% de hipótese).\n\nEstratégia: o último diz \"preto\" se vir um número ímpar de chapéus pretos à frente, e \"branco\" se for par.\n\nO seguinte conta os chapéus pretos que vê. Se a paridade mudou, o seu é preto; senão, é branco. Cada um dos seguintes vai registando as respostas que ouve e faz o mesmo, por isso todos conseguem deduzir a sua cor."
  }
},
{
  diff: 2,
  en: {
    title: "The monk on the mountain",
    q: "A monk starts walking up a mountain at sunrise and reaches the temple at the top at sunset. He walks at varying speeds and stops to rest along the way.\n\nThe next day he starts down the same path at sunrise and reaches the bottom at sunset, again at varying speeds.\n\nIs there a point on the path that he passes at exactly the same time of day on both days?",
    hint: "Imagine both days happening at once, with two monks.",
    a: "Yes, always.\n\nPicture two monks on the same day: one walking up from the bottom, the other walking down from the top, each exactly as the monk did. They start at opposite ends of the path and finish at opposite ends, so at some moment they must meet. That place and time is the point."
  },
  pt: {
    title: "O monge na montanha",
    q: "Um monge começa a subir uma montanha ao nascer do sol e chega ao templo no topo ao pôr do sol. Anda a velocidades diferentes e faz pausas pelo caminho.\n\nNo dia seguinte começa a descer pelo mesmo caminho ao nascer do sol e chega lá abaixo ao pôr do sol, também a velocidades diferentes.\n\nHá algum ponto do caminho por onde passe exatamente à mesma hora nos dois dias?",
    hint: "Imagina os dois dias a acontecer ao mesmo tempo, com dois monges.",
    a: "Sim, sempre.\n\nImagina dois monges no mesmo dia: um a subir desde baixo e outro a descer desde cima, cada um exatamente como o monge fez. Começam em pontas opostas do caminho e acabam em pontas opostas, por isso em algum momento têm de se cruzar. Esse lugar e essa hora são o ponto."
  }
},
{
  diff: 2,
  en: {
    title: "What comes next?",
    q: "What is the next term in this sequence?\n\n1\n11\n21\n1211\n111221\n?",
    hint: "Read each line out loud, describing the line above it.",
    a: "312211.\n\nEach line describes the one before it: \"1\" is \"one 1\" → 11. \"11\" is \"two 1s\" → 21. \"21\" is \"one 2, one 1\" → 1211. \"1211\" → 111221.\n\n\"111221\" is \"three 1s, two 2s, one 1\" → 312211."
  },
  pt: {
    title: "O que vem a seguir?",
    q: "Qual é o próximo termo desta sequência?\n\n1\n11\n21\n1211\n111221\n?",
    hint: "Lê cada linha em voz alta, descrevendo a linha de cima.",
    a: "312211.\n\nCada linha descreve a anterior: \"1\" é \"um 1\" → 11. \"11\" é \"dois 1\" → 21. \"21\" é \"um 2, um 1\" → 1211. \"1211\" → 111221.\n\n\"111221\" é \"três 1, dois 2, um 1\" → 312211."
  }
},
{
  diff: 3,
  en: {
    title: "Three cards",
    q: "A hat contains three cards: one red on both sides, one white on both sides, and one red on one side and white on the other.\n\nYou draw a card at random and put it on the table without looking at the bottom. The top side is red.\n\nWhat is the probability that the bottom side is also red?",
    hint: "It's not 1/2. Count red faces, not cards.",
    a: "2/3.\n\nThere are 3 red faces you could be looking at: two belong to the red-red card and one to the red-white card. All three are equally likely, and in 2 of the 3 cases the other side is red."
  },
  pt: {
    title: "Três cartas",
    q: "Num chapéu há três cartas: uma vermelha dos dois lados, uma branca dos dois lados e uma vermelha de um lado e branca do outro.\n\nTiras uma carta ao acaso e pousa-la na mesa sem ver o lado de baixo. O lado de cima é vermelho.\n\nQual a probabilidade de o lado de baixo também ser vermelho?",
    hint: "Não é 1/2. Conta faces vermelhas, não cartas.",
    a: "2/3.\n\nHá 3 faces vermelhas que podes estar a ver: duas são da carta vermelha-vermelha e uma da vermelha-branca. As três são igualmente prováveis, e em 2 dos 3 casos o outro lado é vermelho."
  }
},
{
  diff: 2,
  en: {
    title: "Zeros at the end",
    q: "100! means 100 × 99 × 98 × … × 2 × 1.\n\nHow many zeros are at the end of this number?",
    hint: "Each trailing zero comes from a 10 = 2 × 5. There are far more 2s than 5s.",
    a: "24.\n\nCount the factors of 5: there are 20 multiples of 5 up to 100, and 4 of them (25, 50, 75, 100) contain an extra 5. 20 + 4 = 24 fives, each paired with a 2 to make a 10."
  },
  pt: {
    title: "Zeros no fim",
    q: "100! significa 100 × 99 × 98 × … × 2 × 1.\n\nCom quantos zeros acaba este número?",
    hint: "Cada zero final vem de um 10 = 2 × 5. Há muitos mais 2 do que 5.",
    a: "24.\n\nConta os fatores 5: há 20 múltiplos de 5 até 100, e 4 deles (25, 50, 75, 100) têm um 5 extra. 20 + 4 = 24 cincos, cada um emparelhado com um 2 para fazer um 10."
  }
},
{
  diff: 1,
  en: {
    title: "Counting ones",
    q: "You write down every whole number from 1 to 100.\n\nHow many times do you write the digit 1?",
    hint: "Count the 1s in the units place, then the tens place, then the hundreds place.",
    a: "21.\n\n• Units place: 1, 11, 21, …, 91 → 10\n• Tens place: 10 to 19 → 10\n• Hundreds place: 100 → 1\n\n10 + 10 + 1 = 21. (11 is counted twice, once for each 1, which is correct.)"
  },
  pt: {
    title: "Contar uns",
    q: "Escreves todos os números inteiros de 1 a 100.\n\nQuantas vezes escreves o algarismo 1?",
    hint: "Conta os 1 nas unidades, depois nas dezenas, depois nas centenas.",
    a: "21.\n\n• Unidades: 1, 11, 21, …, 91 → 10\n• Dezenas: 10 a 19 → 10\n• Centenas: 100 → 1\n\n10 + 10 + 1 = 21. (O 11 conta duas vezes, uma por cada 1, e está certo.)"
  }
},
{
  diff: 1,
  en: {
    title: "Socks in the dark",
    q: "A drawer holds 10 black socks and 10 white socks, all mixed up. The room is completely dark.\n\nWhat is the smallest number of socks you must take out to be sure you have a matching pair?",
    hint: "There are only two colours.",
    a: "3.\n\nWith 2 socks you might have one of each colour. The 3rd sock must match one of them."
  },
  pt: {
    title: "Meias às escuras",
    q: "Uma gaveta tem 10 meias pretas e 10 brancas, todas misturadas. O quarto está completamente às escuras.\n\nQual o menor número de meias que tens de tirar para teres a certeza de ter um par igual?",
    hint: "Só há duas cores.",
    a: "3.\n\nCom 2 meias podes ter uma de cada cor. A 3.ª tem de ser igual a uma delas."
  }
},
{
  diff: 1,
  en: {
    title: "Nine balls",
    q: "You have 9 balls that look identical. One is slightly heavier than the others.\n\nUsing a two-pan balance only twice, how do you find the heavy one?",
    hint: "Split them into three groups.",
    a: "Split into three groups of 3: A, B, C.\n\nWeighing 1: A vs B. If one side is heavier, the heavy ball is in that group; if balanced, it's in C.\n\nWeighing 2: take the 3 balls of that group and put one on each pan. The heavier one is it; if balanced, it's the third ball."
  },
  pt: {
    title: "Nove bolas",
    q: "Tens 9 bolas iguais à vista. Uma é ligeiramente mais pesada do que as outras.\n\nUsando uma balança de dois pratos só duas vezes, como descobres a mais pesada?",
    hint: "Divide-as em três grupos.",
    a: "Divide-as em três grupos de 3: A, B, C.\n\nPesagem 1: A contra B. Se um lado pesar mais, a bola pesada está nesse grupo; se equilibrar, está no C.\n\nPesagem 2: das 3 bolas desse grupo, põe uma em cada prato. A mais pesada é a certa; se equilibrar, é a terceira."
  }
},
{
  diff: 1,
  en: {
    title: "Handshakes",
    q: "10 people meet at a party. Each person shakes hands with every other person exactly once.\n\nHow many handshakes happen in total?",
    hint: "Each person shakes 9 hands, but each handshake involves two people.",
    a: "45.\n\nEach of the 10 people shakes 9 hands: 10 × 9 = 90. But that counts every handshake twice (once for each person), so 90 ÷ 2 = 45."
  },
  pt: {
    title: "Apertos de mão",
    q: "10 pessoas encontram-se numa festa. Cada pessoa aperta a mão a cada uma das outras exatamente uma vez.\n\nQuantos apertos de mão há no total?",
    hint: "Cada pessoa aperta 9 mãos, mas cada aperto envolve duas pessoas.",
    a: "45.\n\nCada uma das 10 pessoas aperta 9 mãos: 10 × 9 = 90. Mas assim cada aperto conta duas vezes (uma por pessoa), por isso 90 ÷ 2 = 45."
  }
},
{
  diff: 2,
  en: {
    title: "Clock hands",
    q: "What is the angle between the hour hand and the minute hand of a clock at exactly 3:15?",
    hint: "It's not 0°. Where is the hour hand a quarter of an hour after 3?",
    a: "7.5°.\n\nThe minute hand points at 3 (90° from 12). The hour hand moves 30° per hour, so in 15 minutes it moves a quarter of that, 7.5°, past the 3. The difference is 7.5°."
  },
  pt: {
    title: "Ponteiros do relógio",
    q: "Qual é o ângulo entre o ponteiro das horas e o dos minutos às 3:15 em ponto?",
    hint: "Não é 0°. Onde está o ponteiro das horas um quarto de hora depois das 3?",
    a: "7,5°.\n\nO ponteiro dos minutos aponta para o 3 (90° a partir do 12). O das horas anda 30° por hora, por isso em 15 minutos anda um quarto disso, 7,5°, para lá do 3. A diferença é 7,5°."
  }
},
{
  diff: 3,
  en: {
    title: "A hundred statements",
    q: "A page contains 100 statements:\n\n1. \"Exactly 1 statement on this page is false.\"\n2. \"Exactly 2 statements on this page are false.\"\n…\n100. \"Exactly 100 statements on this page are false.\"\n\nWhich statements are true?",
    hint: "They contradict each other, so at most one of them can be true.",
    a: "Only statement 99.\n\nEach statement gives a different number, so at most one can be true. All 100 can't be false either, because then statement 100 would be true. So exactly one is true and 99 are false, which is exactly what statement 99 says."
  },
  pt: {
    title: "Cem afirmações",
    q: "Uma página tem 100 afirmações:\n\n1. \"Exatamente 1 afirmação desta página é falsa.\"\n2. \"Exatamente 2 afirmações desta página são falsas.\"\n…\n100. \"Exatamente 100 afirmações desta página são falsas.\"\n\nQuais são verdadeiras?",
    hint: "Contradizem-se umas às outras, por isso no máximo uma pode ser verdadeira.",
    a: "Só a afirmação 99.\n\nCada afirmação dá um número diferente, por isso no máximo uma é verdadeira. Também não podem ser as 100 falsas, porque então a 100 seria verdadeira. Logo exatamente uma é verdadeira e 99 são falsas, que é precisamente o que diz a 99."
  }
},
{
  diff: 2,
  en: {
    title: "Squares on a chessboard",
    q: "How many squares of any size are there on a standard 8 × 8 chessboard?",
    hint: "It's more than 64. Count the 1 × 1 squares, then the 2 × 2, then the 3 × 3…",
    a: "204.\n\nThere are 8 × 8 = 64 squares of size 1, 7 × 7 = 49 of size 2, 6 × 6 = 36 of size 3, and so on down to one 8 × 8 square.\n\n64 + 49 + 36 + 25 + 16 + 9 + 4 + 1 = 204."
  },
  pt: {
    title: "Quadrados no tabuleiro",
    q: "Quantos quadrados de qualquer tamanho há num tabuleiro de xadrez 8 × 8?",
    hint: "São mais de 64. Conta os de 1 × 1, depois os de 2 × 2, depois os de 3 × 3…",
    a: "204.\n\nHá 8 × 8 = 64 quadrados de tamanho 1, 7 × 7 = 49 de tamanho 2, 6 × 6 = 36 de tamanho 3, e assim por diante até um único quadrado 8 × 8.\n\n64 + 49 + 36 + 25 + 16 + 9 + 4 + 1 = 204."
  }
}
];
