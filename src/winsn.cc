#include <napi.h>
#include <cstdlib>

#ifdef _WIN32
#include <windows.h>
#endif

using namespace Napi;

Napi::Value ShortName(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
      Napi::TypeError::New(env, "Wrong number of arguments")
          .ThrowAsJavaScriptException();
      return env.Null();
  }

  Napi::Value val = info[0];
  if (!val.IsString()) {
      Napi::TypeError::New(env, "Wrong arguments")
          .ThrowAsJavaScriptException();
      return env.Null();
  }

#ifdef _WIN32
  std::u16string pathObj = val.ToString().Utf16Value();
  const WCHAR* path = (WCHAR*) pathObj.c_str();

  DWORD len = GetShortPathNameW(path, nullptr, 0);
  WCHAR* out = new WCHAR[len];
  len = GetShortPathNameW(path, out, len);

  if (len < 1) {
      Napi::Error::New(env, "Win32 API gave empty string");
      delete[] out;
      return env.Null();
  }

  Napi::String ret = Napi::String::New(env, (const char16_t*)out, len);
  delete[] out;
  return ret;
#else
  Napi::Error::New(env, "Not windows")
      .ThrowAsJavaScriptException();
  return env.Null();
#endif
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "shortName"),
              Napi::Function::New(env, ShortName));
  return exports;
}

NODE_API_MODULE(addon, Init)
