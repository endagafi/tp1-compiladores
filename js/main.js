
(function ($) {
    "use strict";

    $('#alerta').hide();

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function (e) {

        e.preventDefault();

        document.getElementsByName("roman")[0].value = "";

        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }


        try{
            var resultado = R(input.val() + "eof");
            document.getElementsByName("roman")[0].value = resultado.Ry;
        }catch(e){
            $('#alerta').show();
        }
       


        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


    function crearResultado(Rx, Ry) {
        var obj = {
            Rx: Rx,
            Ry: Ry
        };
        return obj;
    }

    /**
     * 
     * @param {*} numeroDecimal  el digito a ser traducido
     * @returns un objeto compuesto de dos atributos: La longitud del numero decimal y el numero romano equivalente
     */
    function R(numeroDecimal) {

        // Caso base de la recursion
        if (match(numeroDecimal, "eof")) {
            return crearResultado(0, "");
        }
        else {
            //Se  calcula el numero romano equivalente de los digitos a la derecha del digito actual
            var RAnterior = R(numeroDecimal.slice(1, numeroDecimal.length));
        }

        //Esta variable representa la posicion del digito actualmente evaluado
        var RxAcutal = RAnterior.Rx + 1;

        //Esta variable representa el numero romano equivalente SOLO del digito actual segun su posicion en el numero decimal
        var RyActual = transformar(numeroDecimal.slice(0, 1), RxAcutal);

        //Verifica que no se acepten numeros del 101 al 199
        if (match(RyActual, "C") && !match(RAnterior.Ry, "")) throw new Error("Numero no soportado");

        //Se concatena el numero romano equivalente del digito actual junto al numero romano equivalente de los digitos mas a la derecha del mismo
        return crearResultado(RxAcutal, RyActual + RAnterior.Ry);
    }


    /**
     * 
     * @param {*} input el digito a ser comparado
     * @param {*} Rx representa la posicion del digito en el numero decimal
     * @returns una cadena que representa al digito decimal segun su posicion
     */
    function transformar(input, Rx) {
        // Establece los valores de salida para cada caso del digito de la unidad
        if (Rx == 1) {
            if (match(input, 0)) return "";

            if (match(input, 1)) return "I";

            if (match(input, 2)) return "II";

            if (match(input, 3)) return "III";

            if (match(input, 4)) return "IV";

            if (match(input, 5)) return "V";

            if (match(input, 6)) return "VI";

            if (match(input, 7)) return "VII";

            if (match(input, 8)) return "VIII";

            if (match(input, 9)) return "IX";
        }
        // Establece los valores de salida para cada caso del digito de la decena
        else if (Rx == 2) {
            if (match(input, 0)) return "";

            if (match(input, 1)) return "X";

            if (match(input, 2)) return "XX";

            if (match(input, 3)) return "XXX";

            if (match(input, 4)) return "XL";

            if (match(input, 5)) return "L";

            if (match(input, 6)) return "LX";

            if (match(input, 7)) return "LXX";

            if (match(input, 8)) return "LXXX";

            if (match(input, 9)) return "XC";
        }
        // Establece los valores de salida para cada caso del digito de la centena
        else if (Rx == 3) {

            if (match(input, 0)) return "";

            if (match(input, 1)) return "C";

            //Verifica que no se acepten numeros mayores a 199
            throw new Error("Numero no soportado");

        }
        else {

            //Verifica que no se acepten numeros mayores a  1000
            throw new Error("Numero no soportado");
        }


    }


    /**
     * 
     * @param {*} input el caracter leido de la entrada a ser comparado 
     * @param {*} caracter el caracter conocido por la gramatica
     * @returns true si los caracteres coinciden en caso contrario false
     */
    function match(input, caracter) {
        if (input == caracter) {
            return true;
        } else {
            return false;
        }
    }




})(jQuery);