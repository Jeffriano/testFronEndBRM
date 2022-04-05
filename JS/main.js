$(document).ready(function () {
	$('#phone').mask('000-0000000');
});
let txtfName = document.getElementById('txtfName');
txtfName.focus();



const app = new Vue({
	el: '#app',
	data: {
		title: 'AgendaBRM',
		contacts: [],
		fName: '',
		lName: '',
		phone: '',
		mail: '',
		address: '',
		bDate: '',
		select: false,
	},
	methods: {
		limpiar: function () {
			this.fName = '';
			this.lName = '';
			this.phone = '';
			this.mail = '';
			this.address = '';
			this.bDate = '';

		},
		// -- AGREGAR --

		agregarContacto: function () {
			//Validaciones
			if (
				this.fName === ''||
				this.lName === ''||
				this.phone === ''||
				this.mail === ''||
				this.address === ''||
				this.bDate ===''
			) {
				alert('¡Todos los campos son requeridos!');
			} else {
				this.contacts.push({
					Name: this.fName,
					LastName: this.lName,
					Phone: this.phone,
					Mail: this.mail,
					Address: this.address,
					BDate: this.bDate,

				});

				this.limpiar();
				localStorage.setItem('AgendaBRM', JSON.stringify(this.contacts));
				let txtfName = document.getElementById('txtfName');
				txtfName.focus();
			}
		},
		// -- MOSTRAR --
		mostrarContacto: function (index) {
			if (this.fName === '') {
				document.getElementById('boton-submit').disabled = true;
				this.contacts[index].seleccionado = true;
				this.fName = this.contacts[index].Name;
				this.lName = this.contacts[index].LastName;
				this.phone = this.contacts[index].Phone;
				this.mail = this.contacts[index].Mail;
				this.address = this.contacts[index].Address;
				this.bDate = this.contacts[index].BDate;

	


			} else {
				this.editarContacto(index);
				this.contacts[index].seleccionado = false;
				document.getElementById('boton-submit').disabled = false;
			}
		},
		// -- EDITAR --
		editarContacto: function (index) {
			this.contacts[index].Name=this.fName;
			this.contacts[index].LastName=this.lName;
			this.contacts[index].Phone=this.phone;
			this.contacts[index].Mail=this.mail;
			this.contacts[index].Address=this.address;
			this.contacts[index].BDate=this.bDate;

			this.btnEdicion = 'Editar';
			this.limpiar();

			localStorage.setItem('AgendaBRM', JSON.stringify(this.contacts));
		},
		// -- ELIMINAR --
		eliminar: function (index) {
			this.contacts.splice(index, 1);
			localStorage.setItem('AgendaBRM', JSON.stringify(this.contacts));
		},
	},
	// -- GUARDAR EN LOCAL --
	created: function () {
		let datosDB = JSON.parse(localStorage.getItem('AgendaBRM'));
		console.log(datosDB);

		if (datosDB === null) {
			this.contacts = [];
		} else {
			this.contacts = datosDB;
		}
	},

	
});
