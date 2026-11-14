import React from 'react';

export function Campo({ label, erro, tipo = 'text', value, onChange, placeholder, maxLength, rows }) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      {tipo === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows || 3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-bimo-500 focus:border-transparent text-sm"
        />
      ) : (
        <input
          type={tipo}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-bimo-500 focus:border-transparent text-sm"
        />
      )}
      {erro && <p className="text-xs text-red-600 font-medium">{erro}</p>}
    </div>
  );
}