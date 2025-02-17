import {FieldValues, Path} from "react-hook-form";
import {useGenericFormContext} from "@/components/form/customContext.ts";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

type Props<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    placeholder?: string;
    options: { value: string, text: string }[];
    required?: boolean;
    className?: string;
}

export const SelectField = <T extends FieldValues>({
   name,
   label,
   placeholder,
   options,
   required = false,
   className }: Props<T>) => {
      const control = useGenericFormContext<T>();

      return (
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                  <FormItem className={className}>
                      {label && (
                          <FormLabel>
                              <span>{label}</span>
                              {required && <span className="ml-1 text-red-500">*</span>}
                          </FormLabel>
                      )}
                      <Select onValueChange={field.onChange} value={field.value} >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder ?? "Select an item"} />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.text}
                                </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                  </FormItem>
                )}
            >
            </FormField>
      )
  }


SelectField.displayName = 'SelectField';