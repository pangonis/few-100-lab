
import './styles.css';
let billAmountButton: HTMLInputElement;
let tipButtons: NodeListOf<HTMLButtonElement>;
let billAmount: HTMLLabelElement;
let tipPercent: HTMLLabelElement;
let tipAmount: HTMLLabelElement;
let totalPaid: HTMLLabelElement;
let selectedPercent: HTMLButtonElement;
let message: HTMLLabelElement;

setupData();

function setupData() {    
    billAmountButton = document.getElementById("btn-tip-amount") as HTMLInputElement;
    billAmountButton.addEventListener('keyup', invalidamt);
    message = document.getElementById("message") as HTMLLabelElement;
    tipPercent = document.getElementById("tip-percent") as HTMLLabelElement;

    tipButtons = document.querySelectorAll('.btn-secondary') as NodeListOf<HTMLButtonElement>;
    tipButtons.forEach((fld) => {
        fld.addEventListener('click', checkButtonStatus)
        var tip = localStorage.getItem('tipAmount');
        if( tip !== null) {
            if(tip === fld.innerText) {
                selectedPercent = fld;
                selectedPercent.classList.add("selected");
                message.innerText = "You are tipping " + tip;
                tipPercent.innerText = tip;
            }
            else {
                fld.classList.remove('selected');
            }
        };
    });
    billAmount = document.getElementById("bill-amount") as HTMLLabelElement;
    tipAmount = document.getElementById("tip-amount") as HTMLLabelElement;
    totalPaid = document.getElementById("total-amount") as HTMLLabelElement;
}

function invalidamt() {    
    if(this.valueAsNumber < 0){
        this.classList.add('invalid-amount');
    }
    else {
        updateFields();
    }
};

function checkButtonStatus(){
    tipButtons.forEach((fld) => {
        if(fld.classList.contains('selected')){
            fld.classList.remove('selected');
            fld.disabled = false;
        };
    });

    selectedPercent = this as HTMLButtonElement;
    selectedPercent.classList.add('selected');
    selectedPercent.classList.remove('deselected');
    selectedPercent.disabled = true;    
    localStorage.setItem('tipAmount', selectedPercent.innerText)
    updateFields();
}

function updateFields(){
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    if(billAmountButton.value !== "") {
        billAmount.innerText = formatter.format(parseInt(billAmountButton.value));     
        const tip = Math.round(billAmountButton.valueAsNumber * (1-((100-parseInt(selectedPercent.innerText))/100)));
        tipAmount.innerText = formatter.format(tip);
        totalPaid.innerText = formatter.format((parseInt(billAmountButton.value) + tip));
    }
    tipPercent.innerText = selectedPercent.innerText;
    message.innerText = "You are tipping " + tipPercent.innerText;
}


