import { Component } from "./base-components";
import * as validation from "../util/validation";
import { autobind as Autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

//Project Input Class
export class ProjectInput extends Component <HTMLDivElement,HTMLFormElement> {
    
    titleInputElement:HTMLInputElement;
    descriptionInputElement:HTMLInputElement;
    peopleInputElement:HTMLInputElement;

constructor() {
    super('project-input','app',true,'user-input')

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    
this.configure();

}
private gatherUserInput():[string,string,number]|void{
const enteredTitle = this.titleInputElement.value;
const enteredDescription = this.descriptionInputElement.value;
const enteredPeople = this.peopleInputElement.value;

const titleValidatable:validation.Validatable = {
    value:enteredTitle,
    required: true,
};
const descriptionValidatable:validation.Validatable = {
    value:enteredDescription,
    required: true,
    minLength:5
};
const peopleValidatable:validation.Validatable = {
    value: +enteredPeople,
    required: true,
    min:1,
    max: 5
};

if(!validation.validate(titleValidatable) || !validation.validate(descriptionValidatable)
    || !validation.validate(peopleValidatable)){
alert('Invalid Input, please try again.')
return;
}else{
    return [enteredTitle,enteredDescription,+enteredPeople]
}
}
private clearInputs(){
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
}
@Autobind
private submitHandler(event: Event){
    event.preventDefault();
    console.log(this.titleInputElement.value);
const userInput = this.gatherUserInput();
if(Array.isArray(userInput)){
    const [title,desc,people] = userInput;
    console.log(title,desc,people)
    projectState.addProjects(title,desc,people);
    this.clearInputs();
}
}
configure(){
    this.element.addEventListener('submit', this.submitHandler)
}
renderContent(){
    
}


}



   
