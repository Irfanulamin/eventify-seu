const renderField = (field: FieldConfig, form: any, formType: string) => {
  const fieldId = `${formType}-${field.name}`;
  const showPassword = showPasswords[fieldId] || false;

  return (
    <div key={field.name} className="space-y-2">
      <Label htmlFor={fieldId} className="text-sm text-white/80">
        {field.label}
      </Label>
      <div className="relative">
        <Input
          id={fieldId}
          type={
            field.isPassword ? (showPassword ? "text" : "password") : field.type
          }
          placeholder={field.placeholder}
          className="bg-black/50 border-blue-500/30 focus:border-blue-400 text-white placeholder:text-white/50 rounded-xl h-11 px-4 pr-12"
          {...form.register(field.name, field.validation)}
        />
        {field.isPassword && (
          <button
            type="button"
            onClick={() => togglePasswordVisibility(fieldId)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {form.formState.errors[field.name] && (
        <p className="text-red-400 text-xs">
          {form.formState.errors[field.name]?.message}
        </p>
      )}
    </div>
  );
};
