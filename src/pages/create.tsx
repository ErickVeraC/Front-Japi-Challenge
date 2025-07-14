import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { createEvent } from "@/lib/api";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is too short"),
  location: z.string().min(3, "Location is required"),
  date: z.date({ required_error: "Date is required" }),
  capacity: z.number().min(1, "Capacity must be at least 1"),
});

type FormData = z.infer<typeof schema>;

export default function CreateEventPage() {
  const { token, user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      date: new Date(),
      capacity: 1,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const event = await createEvent(data, token!);
      router.push(`/events/${event._id}`);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (!user)
    return (
      <p className="mt-10 text-center">
        You must be logged in to create events.
      </p>
    );

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Create New Event</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Description"
            {...register("description")}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Location"
            {...register("location")}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                showTimeSelect
                selected={field.value}
                onChange={field.onChange}
                dateFormat="Pp"
                className="w-full border px-4 py-2 rounded"
              />
            )}
          />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            min={1}
            placeholder="Capacity"
            {...register("capacity", { valueAsNumber: true })}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.capacity && (
            <p className="text-sm text-red-500">{errors.capacity.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {isSubmitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
