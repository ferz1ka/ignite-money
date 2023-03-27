import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import './style.css'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const NewTransactionModalSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type NewTransactionModalType = zod.infer<typeof NewTransactionModalSchema>

export function NewTransactionModal() {
  const createTransaction = useContextSelector(TransactionsContext, (context) => context.createTransaction)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionModalType>({
    resolver: zodResolver(NewTransactionModalSchema),
  })

  async function handleCreateNewTransaction(formData: NewTransactionModalType) {
    const { description, price, category, type } = formData
    await createTransaction({
      description,
      price,
      category,
      type,
    })
    reset()
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="dialog-overlay" />
      <Dialog.Content className="dialog-content">
        <Dialog.Close className="dialog-close" />
        <Dialog.Title>Nova transação</Dialog.Title>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <RadioGroup.Root
                className="transition-type"
                value={field.value}
                onValueChange={field.onChange}
              >
                <RadioGroup.Item
                  value="income"
                  className="transition-type-item"
                >
                  <img src={incomeImg} alt="" />
                  Entrada
                </RadioGroup.Item>
                <RadioGroup.Item
                  value="outcome"
                  className="transition-type-item"
                >
                  <img src={outcomeImg} alt="" />
                  Saída
                </RadioGroup.Item>
              </RadioGroup.Root>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
