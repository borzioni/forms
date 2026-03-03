(function ($) {
	jQuery.ajaxSettings.traditional = true;
	var settings = {
		language: "ru",
		languageDefault: "en",
		layer: "",
		groupName: "",
		merchantOptions: [],
		merchantOptionsAdditionally: ["PCI_TDS"],
		merchantOptionsDelete: [],
		merchantOptionsAdd: [],
		merchantOptionsChange: [],
		merchantOptionsQueue: null,
		imgAdditionalClass: "",
		dirImg: "../../modules/payment-systems/img/",
		imgFileExtension: "svg",
		showLog: false,
		imgLayerClear: true,
		group: {
			payment: {
				queue: [],
				namePrefix: "logo-",
				list: [
					{
						systemName: "VISA",
						logoHeight: 20,
						text: {
							ru: "Visa Inc.",
							en: "Visa Inc.",
							by: "Visa Inc."
						}
					},
					{
						systemName: "MIR",
						logoHeight: 20,
						text: {
							ru: "\xABМИР\xBB",
							by: "\xABМИР\xBB",
							en: "MIR"
						}
					},
					{
						systemName: "MASTERCARD",
						logoHeight: 40,
						text: {
							ru: "Mastercard",
							by: "Mastercard",
							en: "Mastercard"
						}
					},
					{
						systemName: "MAESTRO",
						logoHeight: 40,
						text: {
							ru: "Maestro",
							by: "Maestro",
							en: "Maestro"
						}
					},
					{
						systemName: "JCB",
						logoHeight: 40,
						text: {
							ru: "JCB",
							by: "JCB",
							en: "JCB"
						}
					},
					{
						systemName: "AMEX",
						logoHeight: 40,
						text: {
							ru: "American Express",
							by: "American Express",
							en: "American Express"
						}
					},
					{
						systemName: "CUP",
						logoHeight: 40,
						text: {
							ru: "China UnionPay",
							by: "China UnionPay",
							en: "China UnionPay"
						}
					},
					{
						systemName: "DINERSCLUB",
						logoHeight: 40,
						text: {
							ru: "Diners Club",
							by: "Diners Club",
							en: "Diners Club"
						}
					},
					{
						systemName: "BELCARD",
						logoHeight: 40,
						text: {
							ru: "БЕЛКАРТ",
							by: "БЕЛКАРТ",
							en: "BELCARD"
						}
					},
					{
						systemName: "DISCOVER",
						logoHeight: 30,
						text: {
							ru: "DISCOVER",
							by: "DISCOVER",
							en: "DISCOVER"
						}
					},
					{
						systemName: "BCARD",
						logoHeight: 30,
						text: {
							ru: "BCARD",
							by: "BCARD",
							en: "BCARD"
						}
					}
				]
			},
			verify: {
				queue: [],
				namePrefix: "verify-",
				list: [
					{
						systemName: "VISA_TDS",
						logoHeight: 40,
						text: {
							ru: "Visa Secure",
							by: "Visa Secure",
							en: "Visa Secure"
						}
					},
					{
						systemName: "MASTERCARD_TDS",
						logoHeight: 40,
						text: {
							ru: "Mastercard Identity Check",
							by: "Mastercard Identity Check",
							en: "Mastercard Identity Check"
						}
					},
					{
						systemName: "MIR_TDS",
						logoHeight: 40,
						version: "20190626",
						text: {
							ru: "Mir Accept",
							by: "Mir Accept",
							en: "Mir Accept"
						}
					},
					{
						systemName: "CUP_TDS",
						logoHeight: 40,
						text: {
							ru: "UPOP SecurePay",
							by: "UPOP SecurePay",
							en: "UPOP SecurePay"
						}
					},
					{
						systemName: "JCB_TDS",
						logoHeight: 40,
						text: {
							ru: "J/Secure",
							by: "J/Secure",
							en: "J/Secure"
						}
					},
					{
						systemName: "AMEX_TDS",
						logoHeight: 40,
						text: {
							ru: "SafeKey",
							by: "SafeKey",
							en: "SafeKey"
						}
					},
					{
						systemName: "DISCOVER_TDS",
						logoHeight: 40,
						text: {
							ru: "ProtectBuy",
							by: "ProtectBuy",
							en: "ProtectBuy"
						}
					},
					{
						systemName: "DINERS_TDS",
						logoHeight: 40,
						text: {
							ru: "ProtectBuy",
							by: "ProtectBuy",
							en: "ProtectBuy"
						}
					},
					{
						systemName: "BELCARD_TDS",
						logoHeight: 40,
						text: {
							ru: "Интернет Пароль БЕЛКАРТ",
							by: "Інтэрнэт Пароль БелКарт",
							en: "Internet Password BelCard"
						}
					},
					{
						systemName: "BCARD_TDS",
						logoHeight: 40,
						text: {
							ru: "Bcard B-Secured",
							by: "Bcard B-Secured",
							en: "Bcard B-Secured"
						}
					},
					{
						systemName: "PCI_TDS",
						logoHeight: 40,
						text: {
							ru: "",
							by: "",
							en: ""
						}
					}
				]
			}
		},
		union: {
			"and": {
				ru: "и",
				en: "and",
				ua: "і",
				de: "und",
				fr: "et",
				es: "y",
				ka: "და"
			},
			"or": {
				ru: "или",
				en: "or",
				ua: "або",
				de: "oder",
				fr: "ou",
				es: "o",
				ka: "ან"
			}
		}
	};
	var methods = {
		init: function () {
			if (!settings.merchantOptions || !settings.merchantOptions.length || !settings.groupName || !(settings.groupName in settings.group) || !$(settings.layer).length) {
				var textError = "Ошибка, работа приостановлена. ";
				if (!$(settings.layer).length) {
					methods.logOutput(textError + " Не найден слой.");
				} else if (!settings.merchantOptions) {
					methods.logOutput(textError + " Нет данных о merchantOptions.");
				} else {
					methods.logOutput(textError);
				}
				return false;
			} else {
				return true;
			}
		},
		setNewSettings: function (updateSettings) {
			if (updateSettings) {
				$.extend(settings, updateSettings);
			}
			methods.updateMerchantOptions();
			methods.logOutput("Обновление setting");
			return true;
		},
		setMerchantOptions: function (merchantOptions) {
			settings.merchantOptions = merchantOptions;
			methods.updateMerchantOptions();
		},
		updateMerchantOptions: function () {
			if (settings.merchantOptionsAdditionally.length) {
				settings.merchantOptionsAdditionally.forEach(function (item) {
					if (!~settings.merchantOptions.indexOf(item))
						settings.merchantOptions.push(item);
				});
			}
			if (settings.merchantOptionsDelete.length) {
				settings.merchantOptions = settings.merchantOptions.filter(function (optionItem) {
					return settings.merchantOptionsDelete.indexOf(optionItem) === -1;
				});
			}
			if (settings.merchantOptionsAdd.length) {
				settings.merchantOptionsAdd.forEach(function (item) {
					if (!~settings.merchantOptions.indexOf(item))
						settings.merchantOptions.push(item);
				});
			}
			if (settings.merchantOptionsChange.length) {
				settings.merchantOptionsChange.forEach(function (item) {
					var key = settings.merchantOptions.indexOf(item.search);
					if (key)
						settings.merchantOptions.splice(key, 1, item.change);
				});
			}
			if (settings.merchantOptionsQueue) {
				for (var groupName in settings.merchantOptionsQueue) {
					var queueEnd = settings.merchantOptionsQueue[groupName].length;
					settings.group[groupName].list.forEach(function (item) {
						var name = item.systemName;
						var index = settings.merchantOptionsQueue[groupName].indexOf(name);
						if (index > -1) {
							settings.group[groupName].queue.push(index);
						} else {
							settings.group[groupName].queue.push(queueEnd++);
						}
					});
				}
			}
		},
		showLogos: function (groupName) {
			settings.layer = $(this);
			settings.groupName = groupName;
			if (!methods.init())
				return false;
			if (settings.imgLayerClear) {
				$(settings.layer).show().children().remove("img");
			} else {
				$(settings.layer).show();
			}
			var group = settings.group[settings.groupName];
			for (var i = 0; i < group.list.length; i++) {
				var index = i;
				if (group.queue.length && group.queue.indexOf(i) > -1) {
					index = group.queue.indexOf(i);
				}
				var value = group.list[index];
				var name = value.systemName.toLowerCase();
				var text = value.text["en"] || value.systemName.replace(/_TDS$/, "");
				var version = value.version ? "?v=" + value.version : "";
				var classNames = name;
				if (settings.imgAdditionalClass) {
					classNames += " " + settings.imgAdditionalClass;
				}
				if (~settings.merchantOptions.indexOf(value.systemName)) {
					$(settings.layer).append("<img " + "src=\"" + settings.dirImg + group.namePrefix + name + "." + settings.imgFileExtension + version + "\" " + "class=\"" + classNames + "\" " + "height=\"" + value.logoHeight + "\" " + "alt=\"" + text + "\" " + "title=\"" + text + "\" " + "onerror=\"$(this).remove()\">");
				}
			}
		},
		showTexts: function (groupName, language) {
			if (language)
				settings.language = language;
			settings.layer = $(this);
			settings.groupName = groupName;
			if (!methods.init())
				return false;
			var group = settings.group[settings.groupName], arr = [], textShow = "";
			$(settings.layer).show().empty("");
			group.list.forEach(function (item) {
				if (~settings.merchantOptions.indexOf(item.systemName)) {
					var text = item.text[settings.language] || item.text[settings.languageDefault];
					if (text)
						arr.push(text);
				}
			});
			if (!arr.length)
				return false;
			var unionType = settings.groupName === "payment" ? "and" : "or", union = settings.union[unionType][settings.language] || settings.union[unionType][settings.languageDefault];
			for (i in arr) {
				txt = arr.length - 1 == i ? " " + union + " " : i > 0 ? ", " : "";
				textShow += txt + arr[i];
			}
			$(settings.layer).text(textShow);
		},
		logOutput: function (str) {
			if (!settings.showLog)
				return false;
			console.log("module PaymentSystems: ", str);
			return true;
		}
	};
	$.fn.paymentSystems = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			$.error("Method " + method + " does not exist on jQuery.paymentSystems");
		}
	};
}(jQuery));