document.addEventListener("DOMContentLoaded", _ => {
    document.addEventListener("submit", event => {
        const target = event.target;

        if (!target.matches("form")) {
            return;
        }
        event.preventDefault();

        new FormSubmitHandler(target);
    });

    class FormSubmitHandler {
        constructor(form) {
            this.form = form;

            this.handleResponse = this.handleResponse.bind(this);

            this.addLoadingMessage();
            this.sendOnServer();
        }

        sendOnServer() {
            fetch("server.php", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: this.getFormDataInJson()
            })
            .then(this.handleResponse, {
            })
            .catch(_ => {
                this.removeLoadingMessage();
                this.addErrorModal();
                this.form.reset();
            });
        }

        createRequest() {
            this.request = new XMLHttpRequest();
            this.request.open("POST", "server.php");
            this.request.setRequestHeader('Content-type', 'application/json');
        }

        getFormDataInJson() {
            const objData = {};
            new FormData(this.form).forEach((value, key) => {
                objData[key] = value;
            });

            const jsonData = JSON.stringify(objData);

            return jsonData;
        }

        handleResponse(response) {
            this.removeLoadingMessage();

            if (response.status === 200) {
                this.addThanksModal();
                console.log(response);
            }
            else {
                this.addErrorModal();
            }

            this.form.reset();
        }

        addLoadingMessage() {
            const loadingMessage = this.createLoadingMessage();

            this.form.after(loadingMessage);
            this.loadingMessage = loadingMessage;
        }

        addErrorModal(){
            const modal = this.createModal("Что-то пошло не так :(");

            this.showModal(modal);

            this.addTimeoutRemoveModal(modal);
        }

        addThanksModal(){
            const modal = this.createModal("Спасибо! Скоро мы с вами свяжемся");

            this.showModal(modal);

            this.addTimeoutRemoveModal(modal);
        }

        removeLoadingMessage(){
            this.loadingMessage.remove();
            this.loadingMessage = null;
        } 

        createLoadingMessage(){
            const message = document.createElement("img");
            message.src = "/img/form/spinner.svg";
            message.classList.add("load");
            return message;
        }

        showModal(modal){
            this.form.classList.add("hide");
            this.form.after(modal);
        }

        addTimeoutRemoveModal(modal){
            setTimeout(_ => {
                modal.remove();
                this.form.classList.remove("hide");
                this.form.closest(".modal").classList.remove("show");
                document.body.classList.remove("overflow-hidden");
            }, 3000);
        }

        createModal(title){
            const modal = document.createElement("div");
            modal.classList.add("modal__content")
            modal.innerHTML = `
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${title}</div>`;
            return modal;
        }
    }
});