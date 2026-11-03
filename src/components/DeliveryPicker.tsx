import { CalendarDays, Clock } from 'lucide-react';
import { DELIVERY_SLOTS } from '../config';
import { useCart } from '../context/CartContext';

export const formatDeliveryDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export function DeliveryPicker() {
  const { delivery, setDelivery } = useCart();
  const today = new Date().toLocaleDateString('en-CA');
  const field = 'flex items-center gap-2 border border-ink/15 bg-white px-3 focus-within:border-gold';

  return (
    <div className="border-b border-ink/10 py-6" data-testid="delivery-picker">
      <p className="text-xs uppercase tracking-[0.22em] text-ink/70">
        Preferred delivery <span className="normal-case tracking-normal text-ink/50">(optional)</span>
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className={field}>
          <CalendarDays className="h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
          <span className="sr-only">Delivery date</span>
          <input
            type="date"
            min={today}
            value={delivery.date}
            onChange={(e) => setDelivery({ ...delivery, date: e.target.value })}
            data-testid="delivery-date-input"
            className="h-11 w-full bg-transparent text-sm text-ink outline-none"
          />
        </label>
        <label className={field}>
          <Clock className="h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
          <span className="sr-only">Delivery time slot</span>
          <select
            value={delivery.slot}
            onChange={(e) => setDelivery({ ...delivery, slot: e.target.value })}
            data-testid="delivery-slot-select"
            className="h-11 w-full bg-transparent text-sm text-ink outline-none"
          >
            <option value="">Choose a time slot</option>
            {DELIVERY_SLOTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      {delivery.date && (
        <p className="mt-2 text-xs text-ink/60" data-testid="delivery-summary">
          {formatDeliveryDate(delivery.date)}{delivery.slot ? ` · ${delivery.slot}` : ''}
        </p>
      )}
    </div>
  );
}
